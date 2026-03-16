import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Trust proxy for being behind nginx/load balancer (CRITICAL for cookies/HTTPS)
app.set('trust proxy', 1);

// Enable CORS for all origins to prevent iframe blocking
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Middleware to handle security headers for iframes
app.use((req, res, next) => {
  // Allow this app to be embedded in iframes (required for AI Studio)
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Ensure any cookies set (even by dependencies) are iframe-compatible
  const originalSetHeader = res.setHeader;
  res.setHeader = function(name: string, value: any) {
    if (name.toLowerCase() === 'set-cookie') {
      if (Array.isArray(value)) {
        value = value.map(v => v.includes('SameSite=None') ? v : `${v}; SameSite=None; Secure`);
      } else if (typeof value === 'string' && !value.includes('SameSite=None')) {
        value = `${value}; SameSite=None; Secure`;
      }
    }
    return originalSetHeader.call(this, name, value);
  };
  
  next();
});

// Data persistence
const DATA_FILE = path.join(__dirname, 'visits.json');
const SUGGESTIONS_FILE = path.join(__dirname, 'suggestions.json');

interface Stats {
  totalVisits: number;
  liveVisitors: number;
}

let stats: Stats = {
  totalVisits: 0,
  liveVisitors: 0
};

let suggestions: any[] = [];

// Load initial stats and suggestions
try {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const savedStats = JSON.parse(data);
    stats.totalVisits = savedStats.totalVisits || 0;
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ totalVisits: 0 }));
  }

  if (fs.existsSync(SUGGESTIONS_FILE)) {
    const data = fs.readFileSync(SUGGESTIONS_FILE, 'utf-8');
    suggestions = JSON.parse(data);
  } else {
    fs.writeFileSync(SUGGESTIONS_FILE, JSON.stringify([]));
  }
} catch (err) {
  console.error('Error loading data:', err);
}

function saveStats() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ totalVisits: stats.totalVisits }));
  } catch (err) {
    console.error('Error saving stats:', err);
  }
}

function saveSuggestions() {
  try {
    fs.writeFileSync(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));
  } catch (err) {
    console.error('Error saving suggestions:', err);
  }
}

// Create HTTP server
const server = createServer(app);

// Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server });

function broadcastStats() {
  const message = JSON.stringify({
    type: 'STATS_UPDATE',
    payload: stats
  });
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (ws) => {
  stats.liveVisitors++;
  stats.totalVisits++;
  saveStats();
  broadcastStats();

  ws.on('close', () => {
    stats.liveVisitors = Math.max(0, stats.liveVisitors - 1);
    broadcastStats();
  });
});

// API routes
app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.get('/api/suggestions', (req, res) => {
  res.json(suggestions);
});

app.post('/api/suggestions', (req, res) => {
  const { sourceText, sourceLang, targetLang, suggestedText, notes } = req.body;
  
  if (!sourceText || !suggestedText) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newSuggestion = {
    id: Date.now().toString(),
    sourceText,
    sourceLang,
    targetLang,
    suggestedText,
    notes: notes || '',
    votes: 0,
    timestamp: new Date().toISOString()
  };

  suggestions.push(newSuggestion);
  saveSuggestions();
  
  res.json({ success: true, suggestion: newSuggestion });
});

app.post('/api/suggestions/:id/vote', (req, res) => {
  const { id } = req.params;
  const { delta } = req.body; // delta should be 1 or -1

  const suggestion = suggestions.find(s => s.id === id);
  if (!suggestion) {
    return res.status(404).json({ error: 'Suggestion not found' });
  }

  suggestion.votes = (suggestion.votes || 0) + (delta || 1);
  saveSuggestions();

  res.json({ success: true, votes: suggestion.votes });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // Handle SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
