
import React from 'react';

interface Props {
  count: number;
  onIncrement: () => void;
  text: string;
}

const MisbahaCounter: React.FC<Props> = ({ count, onIncrement, text }) => {
  return (
    <div className="flex flex-col items-center">
      {text && (
        <div className="text-emerald-800 text-lg font-bold mb-4 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-100">
          {text}
        </div>
      )}
      
      <button
        onClick={onIncrement}
        className="ripple w-72 h-72 rounded-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.1),inset_0_-8px_15px_rgba(0,0,0,0.05)] border-[16px] border-emerald-50 flex items-center justify-center transition-transform active:scale-95 group"
      >
        <div className="text-center">
          <span className="block text-8xl font-bold text-emerald-900 mb-1 font-mono transition-colors group-hover:text-emerald-700">
            {count}
          </span>
          <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">
            سبّح الآن
          </span>
        </div>
      </button>
    </div>
  );
};

export default MisbahaCounter;
