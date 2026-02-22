// components/dashboard/ActiveModel.tsx
"use client";

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { createClient } from '@/lib/supabase/client';

export const ActiveModel = () => {
  const [prediction, setPrediction] = useState("Analyzing Patterns...");
  const activeModel = useDashboardStore((state) => state.activeModel);

  useEffect(() => {
    const supabase = createClient();
    
    const channel = supabase
      .channel('predictions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'predictions' }, (payload) => {
        setPrediction(payload.new.analysis);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="p-4 bg-slate-800/50 rounded-xl border border-indigo-500/30">
      <h3 className="text-xs font-bold text-indigo-400 uppercase">AI Insight</h3>
      <p className="text-sm mt-2 text-slate-200">{prediction}</p>
      <div className="mt-4 text-[10px] text-slate-500">Model: {activeModel}</div>
    </div>
  );
};