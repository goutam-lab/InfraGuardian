"use client";

import { useDashboardStore } from '@/store/dashboardStore';

export const TimeScrubber = () => {
  const { predictionHorizon, setPredictionHorizon } = useDashboardStore();

  return (
    <div className="w-full bg-slate-900/60 p-4 rounded-xl border border-white/5 backdrop-blur-md">
      <div className="flex justify-between mb-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase">Prediction Horizon</label>
        <span className="text-xs font-mono text-blue-400">{predictionHorizon} Minutes</span>
      </div>
      <input
        type="range"
        min="5"
        max="120"
        value={predictionHorizon}
        onChange={(e) => setPredictionHorizon(parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
};