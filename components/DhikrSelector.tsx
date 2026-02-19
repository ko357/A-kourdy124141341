
import React from 'react';
import { Dhikr } from '../types';

interface Props {
  dhikrs: Dhikr[];
  selected: Dhikr;
  onSelect: (d: Dhikr) => void;
}

const DhikrSelector: React.FC<Props> = ({ dhikrs, selected, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar px-1">
      {dhikrs.map((dhikr) => (
        <button
          key={dhikr.id}
          onClick={() => onSelect(dhikr)}
          className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 shadow-sm border ${
            selected.id === dhikr.id
              ? 'bg-emerald-600 text-white border-emerald-500 scale-105 shadow-emerald-200'
              : 'bg-white text-emerald-800 border-slate-100 hover:border-emerald-200'
          }`}
        >
          <span className="font-medium text-sm">{dhikr.text}</span>
        </button>
      ))}
    </div>
  );
};

export default DhikrSelector;
