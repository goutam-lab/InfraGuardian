"use client";

import { create } from 'zustand';
import { DashboardState, SystemMetric } from '@/types';
import { getMockDashboardState } from '@/lib/mockData';
import { createClient } from '@/supabase/client';

/**
 * Extended Store Interface
 * Includes logic for Behavioral Drift calculation and Real-time syncing.
 */
interface DashboardStore extends DashboardState {
    predictionHorizon: number;
    setPredictionHorizon: (value: number) => void;
    updateMetrics: () => void;
    addMetric: (type: keyof DashboardState['metrics'], metric: SystemMetric) => void;
    setFailureProbability: (probability: number) => void;
    subscribeToUpdates: (projectId: string) => void;
    getDriftVariance: (type: 'cpu' | 'latency') => number;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
    // Initialize with mock data for instant UI layout rendering
    ...getMockDashboardState(),
    
    predictionHorizon: 30,
    
    setPredictionHorizon: (value: number) => set({ predictionHorizon: value }),

    updateMetrics: () => {
        set(getMockDashboardState());
    },

    /**
     * Pushes new telemetry into history and updates current values.
     * Limits history to 60 points to maintain chart performance.
     */
    addMetric: (type, metric) => set((state) => {
        const newHistory = [...state.metrics[type].history, metric].slice(-60);
        return {
            metrics: {
                ...state.metrics,
                [type]: { 
                    ...state.metrics[type], 
                    current: metric.value, 
                    history: newHistory 
                }
            }
        };
    }),

    setFailureProbability: (probability: number) => {
        set({ failureProbability: probability });
    },

    /**
     * Logic: Calculates the variance between the most recent value 
     * and the average of the last 10 telemetry points.
     */
    getDriftVariance: (type: 'cpu' | 'latency') => {
        const history = get().metrics[type].history;
        if (history.length < 10) return 0;

        const last10 = history.slice(-10);
        const avg = last10.reduce((acc, curr) => acc + curr.value, 0) / last10.length;
        const current = history[history.length - 1].value;

        return avg === 0 ? 0 : Math.abs((current - avg) / avg);
    },

    /**
     * Real-time Synchronization Engine
     * Listens for telemetry logs and AI Agent predictions from Supabase.
     */
    subscribeToUpdates: (projectId) => {
        const supabase = createClient();
        
        // 1. Channel for live telemetry (CPU, Latency, etc.)
        const telemetrySub = supabase
            .channel('realtime_metrics')
            .on('postgres_changes', 
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'system_metrics_logs', 
                    filter: `project_id=eq.${projectId}` 
                },
                (payload) => {
                    const data = payload.new;
                    // Update CPU metrics
                    get().addMetric('cpu', { 
                        timestamp: Date.now(), 
                        value: data.cpu_usage || 0 
                    });
                    // Update Latency metrics
                    get().addMetric('latency', { 
                        timestamp: Date.now(), 
                        value: data.latency_ms || 0 
                    });
                }
            )
            .subscribe();

        // 2. Channel for AI Agent Analysis results
        const predictionSub = supabase
            .channel('realtime_predictions')
            .on('postgres_changes', 
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'predictions', 
                    filter: `project_id=eq.${projectId}` 
                },
                (payload) => {
                    const { probability, analysis, severity } = payload.new;
                    set({ 
                        failureProbability: probability,
                        driftDetected: probability > 0.5,
                        driftSeverity: (severity?.toLowerCase() === 'critical' || probability > 0.8) ? 'high' : 'medium',
                        activeModel: analysis 
                    });
                }
            )
            .subscribe();

        // Cleanup function for useEffect
        return () => {
            supabase.removeChannel(telemetrySub);
            supabase.removeChannel(predictionSub);
        };
    }
}));    