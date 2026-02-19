
import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface Props {
  dedication: {
    main: string;
    names: string[];
    message: string;
  };
  onClose: () => void;
}

const DedicationCard: React.FC<Props> = ({ dedication, onClose }) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative border border-emerald-50">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="h-32 bg-emerald-800 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }}></div>
          <h2 className="text-white text-3xl font-amiri font-bold relative z-10">{dedication.main}</h2>
        </div>

        <div className="p-8 text-center">
          <p className="text-slate-500 text-sm mb-6 font-medium">على روح المغفور لهم بإذن الله:</p>
          
          <div className="space-y-4 mb-8">
            {dedication.names.map((name, idx) => (
              <div key={idx} className="bg-emerald-50 py-3 rounded-2xl border border-emerald-100">
                <p className="text-xl font-bold text-emerald-900 font-amiri">{name}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-700 leading-relaxed font-amiri text-lg">
              "{dedication.message}"
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <a 
              href="https://sunnah.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-700 font-bold text-sm hover:underline"
            >
              <span>تصفح أذكار أخرى من السنة</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
      
      <p className="text-center mt-6 text-slate-400 text-xs italic">
        تقبل الله منا ومنكم صالح الأعمال
      </p>
    </div>
  );
};

export default DedicationCard;
