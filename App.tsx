import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Translator from './components/Translator';
import CultureAssistant from './components/CultureAssistant';
import LanguageSpotlights from './components/LanguageSpotlights';
import ScriptsOfMyanmar from './components/ScriptsOfMyanmar';
import ChinLanguageInfo from './components/ChinLanguageInfo';
import MonLanguageInfo from './components/MonLanguageInfo';
import RakhineLanguageInfo from './components/RakhineLanguageInfo';
import ShanLanguageInfo from './components/ShanLanguageInfo';
import KachinLanguageInfo from './components/KachinLanguageInfo';
import KarenniLanguageInfo from './components/KarenniLanguageInfo';
import KarenLanguageInfo from './components/KarenLanguageInfo';
import MyanmarLanguageInfo from './components/MyanmarLanguageInfo';
import VisitorStats from './components/VisitorStats';
import Donate from './components/Donate';
import { BookOpen, Globe, MessageCircle, Languages, GraduationCap, Coffee } from 'lucide-react';

type View = 'translate' | 'culture' | 'learn' | 'donate';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('translate');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-stone-50/80 backdrop-blur-md z-50 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setCurrentView('translate')}
          >
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-600/20">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 tracking-tight hidden sm:block">
              Burmese Alphabets
            </h1>
          </div>
          
          <nav className="flex items-center gap-2 md:gap-8">
            <button 
              onClick={() => setCurrentView('translate')}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-full flex items-center gap-2 ${currentView === 'translate' ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:text-amber-700'}`}
            >
              <Languages className="w-4 h-4" />
              Translate
            </button>
            <button 
              onClick={() => setCurrentView('culture')}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-full flex items-center gap-2 ${currentView === 'culture' ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:text-amber-700'}`}
            >
              <MessageCircle className="w-4 h-4" />
              Culture
            </button>
            <button 
              onClick={() => setCurrentView('learn')}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-full flex items-center gap-2 ${currentView === 'learn' ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:text-amber-700'}`}
            >
              <GraduationCap className="w-4 h-4" />
              Learn
            </button>
            <button 
              onClick={() => setCurrentView('donate')}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-full flex items-center gap-2 ${currentView === 'donate' ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:text-amber-700'}`}
            >
              <Coffee className="w-4 h-4" />
              Coffee
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 min-h-[calc(100vh-300px)]">
        <AnimatePresence mode="wait">
          {currentView === 'translate' && (
            <motion.div
              key="translate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <section className="max-w-4xl mx-auto text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider uppercase mb-6">
                    step 1.1
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
                    More than Understanding
                  </h2>
                  <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                    Translate between diverse ethnic languages, explore cultural nuances, and connect with the rich heritage of Myanmar's people.
                  </p>
                  
                  <div className="mt-8">
                    <VisitorStats />
                  </div>
                </motion.div>
              </section>

              {/* Translator Section */}
              <section className="mb-24 relative z-10">
                <Translator />
              </section>
            </motion.div>
          )}

          {currentView === 'culture' && (
            <motion.div
              key="culture"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
                  Cultural Insights
                </h2>
                <p className="text-stone-600">
                  Explore the traditions, history, and diverse scripts of Myanmar.
                </p>
              </div>

              {/* Culture Assistant Section */}
              <section className="mb-24 bg-stone-100 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
                
                <div className="relative z-10">
                  <CultureAssistant />
                </div>
              </section>

              {/* Scripts Info Section */}
              <section className="mb-24">
                <ScriptsOfMyanmar />
              </section>

              {/* Chin Language Info Section */}
              <section id="chin-section" className="mb-24">
                <ChinLanguageInfo />
              </section>

              {/* Mon Language Info Section */}
              <section id="mon-section" className="mb-24">
                <MonLanguageInfo />
              </section>

              {/* Rakhine Language Info Section */}
              <section id="rakhine-section" className="mb-24">
                <RakhineLanguageInfo />
              </section>

              {/* Shan Language Info Section */}
              <section id="shan-section" className="mb-24">
                <ShanLanguageInfo />
              </section>

              {/* Kachin Language Info Section */}
              <section id="kachin-section" className="mb-24">
                <KachinLanguageInfo />
              </section>

              {/* Karenni Language Info Section */}
              <section id="karenni-section" className="mb-24">
                <KarenniLanguageInfo />
              </section>

              {/* Karen Language Info Section */}
              <section id="karen-section" className="mb-24">
                <KarenLanguageInfo />
              </section>

              {/* Myanmar Language Info Section */}
              <section id="myanmar-section" className="mb-24">
                <MyanmarLanguageInfo />
              </section>
            </motion.div>
          )}

          {currentView === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
                  Language Learning
                </h2>
                <p className="text-stone-600">
                  Discover common phrases and scripts from across the region.
                </p>
              </div>

              {/* Language Spotlights Section */}
              <section className="mb-20">
                <LanguageSpotlights />
              </section>
            </motion.div>
          )}

          {currentView === 'donate' && (
            <motion.div
              key="donate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Donate />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center">
                <Globe className="text-stone-200 w-5 h-5" />
              </div>
              <span className="text-xl font-serif font-bold text-stone-200">Burmese Alphabets</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering communication across Myanmar's diverse ethnic landscape through AI-driven translation and cultural understanding.
            </p>
          </div>
          
          <div>
            <h4 className="text-stone-200 font-bold mb-6">Languages</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('kachin-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Kachin</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('karenni-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Karenni (Kayah)</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('karen-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Karen (Kayin)</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('chin-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Chin</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('mon-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Mon</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('myanmar-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Myanmar</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('rakhine-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Rakhine</button></li>
              <li><button onClick={() => { setCurrentView('culture'); setTimeout(() => document.getElementById('shan-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-amber-500 transition-colors text-left">Shan</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-stone-200 font-bold mb-6">Project</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setCurrentView('culture')} className="hover:text-amber-500 transition-colors text-left">About Us</button></li>
              <li><button onClick={() => setCurrentView('culture')} className="hover:text-amber-500 transition-colors text-left">Cultural Insights</button></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Burmese Alphabets. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Powered by Tavoy.Studio</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
