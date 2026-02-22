"use client";

import { useDashboardStore } from '@/store/dashboardStore';

export const TimeScrubber = () => {
  const { predictionHorizon, setPredictionHorizon } = useDashboardStore();

  return (
    <div className="mt-6 space-y-2 px-2">
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500 font-bold">
        <span>Present</span>
        <span>Forecast: +{predictionHorizon}m</span>
        <span>+60m</span>
      </div>
      <input
        type="range"
        min="0"
        max="60"
        value={predictionHorizon}
        onChange={(e) => setPredictionHorizon(parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
      />
    </div>
  );
};