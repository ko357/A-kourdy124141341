
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { StatsData } from '../types';
import { Trash2 } from 'lucide-react';

interface Props {
  data: StatsData[];
  total: number;
  onClear: () => void;
}

const StatsView: React.FC<Props> = ({ data, total, onClear }) => {
  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-100">
        <p className="text-emerald-100 text-sm mb-1">إجمالي التسبيحات</p>
        <h3 className="text-4xl font-bold font-mono">{total.toLocaleString()}</h3>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-slate-800">توزيع الأذكار</h4>
          <button onClick={onClear} className="text-rose-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>

        {data.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#475569' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 italic">
            لا توجد إحصائيات لعرضها بعد
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.slice(0, 4).map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{item.name}</p>
            <p className="text-xl font-bold text-emerald-800">{item.count.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsView;
