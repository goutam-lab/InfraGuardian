"use client";

import { create } from 'zustand';
import { DashboardState, SystemMetric } from '@/types';
import { getMockDashboardState } from '@/lib/mockData';
import { createClient } from '@/supabase/client';

/**
 * Extended Store Interface
 * Includes predictionHorizon for the Time-Scrubber and 
 * helper functions for real-time data ingestion.
 */
interface DashboardStore extends DashboardState {
    predictionHorizon: number;
    setPredictionHorizon: (value: number) => void;
    updateMetrics: () => void;
    addMetric: (type: keyof DashboardState['metrics'], metric: SystemMetric) => void;
    setFailureProbability: (probability: number) => void;
    subscribeToUpdates: (projectId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
    // Initialize with mock data to ensure UI elements have values on first load
    ...getMockDashboardState(),
    
    // Time-Scrubber state
    predictionHorizon: 30, // Default to 30 minutes in the future
    
    // Actions for manual state updates
    setPredictionHorizon: (value: number) => set({ predictionHorizon: value }),

    updateMetrics: () => {
        set(getMockDashboardState());
    },

    /**
     * Pushes new metrics into the history array and updates current value.
     * Limits history to the last 60 points to maintain performance.
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
     * Real-time Synchronization Engine
     * Connects to Supabase to listen for new system logs and AI predictions.
     */
    subscribeToUpdates: (projectId) => {
        const supabase = createClient();
        
        // 1. Channel for live telemetry (CPU, Latency, etc.)
        supabase
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
                        timestamp: Date.parse(data.created_at), 
                        value: data.cpu_usage 
                    });
                    // Update Latency metrics
                    get().addMetric('latency', { 
                        timestamp: Date.parse(data.created_at), 
                        value: data.latency_ms 
                    });
                }
            )
            .subscribe();

        // 2. Channel for AI Agent Analysis results
        supabase
            .channel('realtime_predictions')
            .on('postgres_changes', 
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'predictions', 
                    filter: `project_id=eq.${projectId}` 
                },
                (payload) => {
                    set({ 
                        failureProbability: payload.new.probability,
                        // Drift is detected if failure risk exceeds 50%
                        driftDetected: payload.new.probability > 0.5,
                        driftSeverity: payload.new.probability > 0.8 ? 'high' : 'medium',
                        // Updates the active model status with the AI's latest analysis
                        activeModel: payload.new.analysis 
                    });
                }
            )
            .subscribe();
    }
}));