"use client";

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { FailureProbability } from '@/components/dashboard/FailureProbability';
import { BehavioralDrift } from '@/components/dashboard/BehavioralDrift';
import { FutureTimeline } from '@/components/dashboard/FutureTimeline';
import { TimeScrubber } from '@/components/dashboard/TimeScrubber';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { 
    failureProbability, 
    activeModel, 
    subscribeToUpdates,
    metrics 
  } = useDashboardStore();

  // Hydration fix: ensures client-only data doesn't clash with server HTML
  const [mounted, setMounted] = useState(false);

  // Replace with your actual project ID from Supabase
  const PROJECT_ID = "brimxmtltnrxkyqkpqel";

  useEffect(() => {
    setMounted(true);
    // Initialize real-time listeners for logs and AI predictions
    const unsubscribe = subscribeToUpdates(PROJECT_ID) as (() => void) | undefined;
    
    // Cleanup subscriptions on unmount
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [subscribeToUpdates]);

  const getStatusMessage = () => {
    if (failureProbability > 0.8) return "Critical anomalies detected. System failure is imminent without immediate intervention.";
    if (failureProbability > 0.5) return "Warning: System behavior is drifting from the baseline. Performance may degrade soon.";
    if (failureProbability > 0.2) return "Minor fluctuations detected, but infrastructure remains stable.";
    return "All systems operational. Telemetry patterns match historical stability baselines.";
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              INFRA<span className="text-blue-500">GUARDIAN</span>
            </h1>
            <p className="text-slate-500 text-xs font-mono mt-1">
              AI-POWERED PREDICTIVE MONITORING // PROJECT: {PROJECT_ID}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-lg border border-white/5">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Engine Status</p>
              <p className="text-xs text-green-400 font-mono">LLAMA-3.3-70B ACTIVE</p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          </div>
        </header>

        {/* System Health TL;DR Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 mb-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`h-2 w-2 rounded-full animate-pulse ${failureProbability > 0.5 ? 'bg-red-500' : 'bg-green-500'}`} />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">System Health TL;DR</h2>
          </div>
          <p className="text-lg md:text-xl text-slate-300 font-medium">
            {mounted ? getStatusMessage() : "Initializing system health check..."}
          </p>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeModel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-white/5"
            >
              <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">AI Agent Intelligence:</p>
              <p className="text-sm text-slate-400 italic mt-1 leading-relaxed">
                "{mounted ? (activeModel || 'Waiting for next log ingestion to analyze trends...') : 'Syncing neural engine...'}"
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Failure Risk Gauge */}
          <div className="lg:col-span-4 h-full">
            <FailureProbability />
          </div>

          {/* Right Column: Charts & Controls */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BehavioralDrift />
              <FutureTimeline />
            </div>
            
            {/* Control Section */}
            <div className="mt-auto">
              <TimeScrubber />
            </div>
          </div>
        </div>

        {/* Footer Meta - Fixed with suppressHydrationWarning and mount check */}
        <footer className="mt-12 flex justify-between items-center text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
          <div suppressHydrationWarning>
            System Latency: {mounted ? metrics.latency.current.toFixed(2) : "0.00"}ms
          </div>
          <div>© 2026 InfraGuardian // Secure Terminal</div>
          <div>Node Status: Optimal</div>
        </footer>
      </div>
    </main>
  );
}