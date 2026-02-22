"use client";

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { FailureProbability } from '@/components/dashboard/FailureProbability';
import { FutureTimeline } from '@/components/dashboard/FutureTimeline';
import { BehavioralDrift } from '@/components/dashboard/BehavioralDrift';
import { TimeScrubber } from '@/components/dashboard/TimeScrubber';

export default function DashboardPage() {
  const { subscribeToUpdates, driftDetected } = useDashboardStore();

  useEffect(() => {
    // Start listening for the 'dti' project logs
    subscribeToUpdates('brimxmtltnrxkyqkpqel');
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8">
      {/* Header with Drift Status */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">INFRAGUARDIAN</h1>
          <p className="text-slate-500 font-mono text-xs mt-1 uppercase tracking-[0.2em]">
            AI-Driven Failure Prediction // Project: brimxmtltnrxkyqkpqel
          </p>
        </div>
        
        {driftDetected && (
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-full animate-pulse">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
              ⚠️ Behavioral Drift Detected
            </span>
          </div>
        )}
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1: The Health Core */}
        <div className="md:col-span-1 h-[400px]">
          <FailureProbability />
        </div>
        
        <div className="md:col-span-2 h-[400px]">
          <FutureTimeline />
          <TimeScrubber />
        </div>

        {/* Row 2: Deep Analysis */}
        <div className="md:col-span-2 h-[350px]">
          <BehavioralDrift />
        </div>

        <div className="md:col-span-1 bg-slate-900/40 rounded-2xl border border-white/5 p-6 overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">AI Log Analysis</h3>
          <div className="space-y-4">
            {/* AI analysis text will stream here from the store */}
            <p className="text-sm text-slate-400 leading-relaxed font-mono">
              Analyzing latest telemetry... 
              Detecting patterns in latency variance.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}