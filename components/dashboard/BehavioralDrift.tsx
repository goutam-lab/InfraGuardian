"use client";

import { useDashboardStore } from '@/store/dashboardStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const BehavioralDrift = () => {
  const { metrics, failureProbability } = useDashboardStore();
  
  // Combine CPU and Latency history into chart-friendly data
  const chartData = metrics.cpu.history.map((point, index) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cpu: point.value,
    latency: metrics.latency.history[index]?.value || 0,
    risk: (failureProbability || 0) * 100 
  }));

  return (
    <div className="h-full w-full bg-slate-900/40 p-4 rounded-2xl border border-white/5">
      <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Behavioral Drift</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey="risk" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorRisk)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-4">
        <span className="text-[10px] text-slate-500 font-mono">STABILITY BASELINE</span>
        <span className="text-[10px] text-red-500 font-mono font-bold">
          DRIFT: {((failureProbability || 0) * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
};