"use client";

import { useDashboardStore } from '@/store/dashboardStore';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const FutureTimeline = () => {
  const { metrics, predictionHorizon } = useDashboardStore();
  
  // Filter predicted points based on the scrubber position
  const visiblePredictions = metrics.cpu.predicted.slice(0, predictionHorizon);

  const chartData = [
    ...metrics.cpu.history.map(d => ({ ...d, type: 'actual' })),
    ...visiblePredictions.map(d => ({ ...d, type: 'predicted' }))
  ];

  return (
    <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-slate-300">Predictive Path</h3>
        <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
          {predictionHorizon}m Projection
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData}>
          <XAxis dataKey="timestamp" hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '8px' }}
            itemStyle={{ color: '#6366F1' }}
          />
          {/* Visual marker for the current time */}
          <ReferenceLine 
            x={metrics.cpu.history[metrics.cpu.history.length - 1]?.timestamp} 
            stroke="#6366F1" 
            strokeDasharray="3 3" 
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366F1" 
            fillOpacity={1} 
            fill="url(#fadeIndigo)" 
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="fadeIndigo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>

      {/* Integrated Scrubber Slider */}
      <input 
        type="range" 
        min="0" 
        max="60" 
        value={predictionHorizon}
        onChange={(e) => useDashboardStore.getState().setPredictionHorizon(parseInt(e.target.value))}
        className="w-full h-1 mt-4 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />
    </div>
  );
};