
import React from 'react';
import { Heart } from 'lucide-react';

interface Props {
  dedication: {
    main: string;
    names: string[];
    message: string;
  };
  onEnter: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ dedication, onEnter }) => {
  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center p-6 text-center text-white max-w-md mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }}></div>

      <div className="relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-emerald-700">
          <Heart size={48} className="text-rose-400 fill-current" />
        </div>

        <h1 className="text-4xl font-amiri font-bold mb-4">{dedication.main}</h1>
        <p className="text-emerald-200 mb-8 font-medium">على روح المغفور لهم بإذن الله:</p>

        <div className="space-y-4 mb-10">
          {dedication.names.map((name, idx) => (
            <div key={idx} className="bg-emerald-800/50 backdrop-blur-sm py-4 px-6 rounded-3xl border border-emerald-700/50 shadow-lg">
              <p className="text-2xl font-bold font-amiri text-white tracking-wide">{name}</p>
            </div>
          ))}
        </div>

        <p className="text-emerald-100/80 italic font-amiri text-xl mb-12 leading-relaxed max-w-xs mx-auto">
          "{dedication.message}"
        </p>

        <button 
          onClick={onEnter}
          className="bg-white text-emerald-900 px-12 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-emerald-50 transition-all active:scale-95 ring-4 ring-emerald-800"
        >
          دخول للبرنامج
        </button>
      </div>

      <div className="absolute bottom-8 text-emerald-400 text-xs tracking-widest opacity-50 font-bold uppercase">
        سبحة الذاكرين
      </div>
    </div>
  );
};

export default WelcomeScreen;
