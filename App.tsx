
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_DHIKR_LIST, DEDICATION } from './constants';
import { Dhikr, StatsData, DailyInspiration } from './types';
import { getDailyInspiration } from './services/geminiService';
import MisbahaCounter from './components/MisbahaCounter';
import StatsView from './components/StatsView';
import WelcomeScreen from './components/WelcomeScreen';
import DedicationCard from './components/DedicationCard';
import { BarChart3, RotateCcw, Heart, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentDhikrIndex, setCurrentDhikrIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [history, setHistory] = useState<Record<string, number>>({});
  const [inspiration, setInspiration] = useState<DailyInspiration | null>(null);
  const [view, setView] = useState<'counter' | 'stats' | 'about'>('counter');

  const currentDhikr = INITIAL_DHIKR_LIST[currentDhikrIndex];

  // Load data from localStorage
  useEffect(() => {
    const savedTotal = localStorage.getItem('totalCount');
    const savedHistory = localStorage.getItem('dhikrHistory');
    if (savedTotal) setTotalCount(parseInt(savedTotal));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const fetchInspiration = async () => {
      const data = await getDailyInspiration();
      setInspiration(data);
    };
    fetchInspiration();
  }, []);

  // Update stats logic
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
    setTotalCount(prev => {
      const newTotal = prev + 1;
      localStorage.setItem('totalCount', newTotal.toString());
      return newTotal;
    });

    setHistory(prev => {
      const newHistory = { ...prev, [currentDhikr.text]: (prev[currentDhikr.text] || 0) + 1 };
      localStorage.setItem('dhikrHistory', JSON.stringify(newHistory));
      return newHistory;
    });

    // Provide haptic feedback if available
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  }, [currentDhikr.text]);

  const handleReset = () => {
    if (confirm('هل تريد تصفير العداد الحالي؟')) {
      setCount(0);
    }
  };

  const nextDhikr = () => {
    setCurrentDhikrIndex((prev) => (prev + 1) % INITIAL_DHIKR_LIST.length);
    setCount(0);
  };

  const prevDhikr = () => {
    setCurrentDhikrIndex((prev) => (prev - 1 + INITIAL_DHIKR_LIST.length) % INITIAL_DHIKR_LIST.length);
    setCount(0);
  };

  const statsData: StatsData[] = Object.entries(history).map(([name, count]) => ({
    name,
    count
  }));

  if (!hasEntered) {
    return <WelcomeScreen dedication={DEDICATION} onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }}></div>

      {/* Header */}
      <header className="bg-emerald-800 text-white p-6 rounded-b-3xl shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold font-amiri">سبحة الذاكرين</h1>
          <button 
            onClick={() => setView('about')}
            className="p-2 bg-emerald-700 rounded-full hover:bg-emerald-600 transition-colors"
          >
            <Heart size={20} className="fill-current text-rose-300" />
          </button>
        </div>
        
        <div className="bg-emerald-700/50 p-4 rounded-2xl backdrop-blur-sm">
          {inspiration ? (
            <div className="text-center">
              <p className="text-sm font-amiri leading-relaxed mb-1 italic opacity-90">"{inspiration.verse}"</p>
              <p className="text-[10px] uppercase tracking-wider opacity-70">{inspiration.reference}</p>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-3/4 bg-emerald-600 rounded mb-2"></div>
              <div className="h-3 w-1/4 bg-emerald-600 rounded"></div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 relative z-10">
        {view === 'counter' && (
          <div className="space-y-6 flex flex-col items-center justify-center py-4">
            {/* Simplified Dhikr Display with Navigation Arrows */}
            <div className="flex items-center justify-between w-full max-w-xs mb-2">
              <button onClick={prevDhikr} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                <ChevronRight size={24} />
              </button>
              <div className="text-emerald-800 text-xl font-bold font-amiri bg-emerald-50 px-6 py-2 rounded-2xl border border-emerald-100 shadow-sm">
                {currentDhikr.text}
              </div>
              <button onClick={nextDhikr} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                <ChevronLeft size={24} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <MisbahaCounter count={count} onIncrement={handleIncrement} text="" />
              
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-emerald-800 rounded-2xl shadow-sm border border-emerald-100 hover:bg-emerald-50 transition-colors"
                >
                  <RotateCcw size={18} />
                  <span className="font-bold">تصفير العداد</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'stats' && (
          <StatsView data={statsData} total={totalCount} onClear={() => {
            if(confirm('سيتم حذف كافة الإحصائيات، هل أنت متأكد؟')) {
               localStorage.clear();
               setTotalCount(0);
               setHistory({});
            }
          }} />
        )}

        {view === 'about' && (
          <DedicationCard 
            dedication={DEDICATION} 
            onClose={() => setView('counter')} 
          />
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="bg-white border-t border-slate-100 p-2 flex justify-around items-center sticky bottom-0 z-20 rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setView('counter')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'counter' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400'}`}
        >
          <BookOpen size={24} />
          <span className="text-[10px] font-bold mt-1">السبحة</span>
        </button>
        
        <button 
          onClick={() => setView('stats')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'stats' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400'}`}
        >
          <BarChart3 size={24} />
          <span className="text-[10px] font-bold mt-1">الإحصائيات</span>
        </button>

        <button 
          onClick={() => setView('about')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'about' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400'}`}
        >
          <Heart size={24} />
          <span className="text-[10px] font-bold mt-1">الإهداء</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
