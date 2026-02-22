"use client";

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { generateDriftData } from '@/lib/mockData';

export const BehavioralDrift = () => {
  const data = generateDriftData(); // Currently uses mock; will pull from AI predictions

  return (
    <div className="h-full w-full p-4 bg-slate-900/40 rounded-2xl border border-white/5">
      <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Behavioral Drift Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="driftGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px' }} 
            labelStyle={{ color: '#94A3B8' }}
          />
          
          {/* Normal Path: Baseline expected behavior */}
          <Area 
            type="monotone" 
            dataKey="normal" 
            stroke="#10B981" 
            fill="transparent" 
            strokeDasharray="5 5"
          />
          
          {/* Drift Path: The actual divergence detected by AI */}
          <Area 
            type="monotone" 
            dataKey="drift" 
            stroke="#EF4444" 
            fill="url(#driftGradient)" 
            strokeWidth={3}
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};