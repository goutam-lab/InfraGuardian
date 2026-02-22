"use client";

import { useDashboardStore } from '@/store/dashboardStore';
import { motion } from 'framer-motion';

export const FailureProbability = () => {
  const { failureProbability } = useDashboardStore();
  
  // Calculate stroke dash array for the circle (Circumference = 2 * PI * r)
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (failureProbability * circumference);

  // Determine color based on probability thresholds
  const getColor = (prob: number) => {
    if (prob < 0.3) return '#10B981'; // Emerald (Healthy)
    if (prob < 0.7) return '#F59E0B'; // Amber (Drift)
    return '#EF4444'; // Red (Failure Imminent)
  };

  const statusColor = getColor(failureProbability);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/40 rounded-2xl border border-white/5 h-full relative overflow-hidden">
      <h3 className="text-xs font-bold text-slate-500 uppercase mb-8 tracking-widest">Failure Probability</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Background Track */}
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={statusColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${statusColor}44)` }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center">
          <motion.span 
            className="text-4xl font-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {(failureProbability * 100).toFixed(1)}%
          </motion.span>
          <span className="text-[10px] text-slate-400 font-medium uppercase mt-1">
            Risk Level
          </span>
        </div>
      </div>

      {/* AI Confidence Indicator */}
      <div className="mt-8 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: statusColor }} />
        <span className="text-[11px] text-slate-300 font-semibold uppercase">
          AI Status: {failureProbability > 0.7 ? 'Critical Alert' : 'Monitoring'}
        </span>
      </div>
    </div>
  );
};