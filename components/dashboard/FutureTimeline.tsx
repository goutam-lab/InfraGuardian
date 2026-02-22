"use client";

import { useDashboardStore } from '@/store/dashboardStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const FutureTimeline = () => {
  const { failureProbability, predictionHorizon } = useDashboardStore();

  const generateFutureData = () => {
    const data = [];
    const now = Date.now();
    
    // Project 10 data points into the future based on horizon
    for (let i = 0; i <= 10; i++) {
      const futureTime = new Date(now + (i * (predictionHorizon / 10)) * 60000);
      data.push({
        time: futureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projectedRisk: Math.min(100, ((failureProbability || 0) * 100) + (i * 1.5)) 
      });
    }
    return data;
  };

  return (
    <div className="h-full w-full bg-slate-900/40 p-4 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Future Projection</h3>
        <span className="text-[10px] text-blue-400 font-mono font-bold">{predictionHorizon}m HORIZON</span>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={generateFutureData()}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
            />
            <Line 
              type="monotone" 
              dataKey="projectedRisk" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ r: 2, fill: '#3b82f6' }}
              strokeDasharray="5 5"
            />
            <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};