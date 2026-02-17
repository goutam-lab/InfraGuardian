"use client";

import GlassCard from "@/components/ui/GlassCard";
import { useDashboardStore } from "@/store/dashboardStore";
import { AlertTriangle } from "lucide-react";

export default function FailureProbability() {
    const { failureProbability } = useDashboardStore();

    const percentage = (failureProbability * 100).toFixed(2);
    const riskLevel = failureProbability < 0.05 ? 'Low' : failureProbability < 0.15 ? 'Medium' : 'High';
    const riskColor = failureProbability < 0.05 ? 'text-success' : failureProbability < 0.15 ? 'text-warning' : 'text-critical';

    return (
        <GlassCard>
            <div className="flex flex-col h-full">
                <h3 className="text-sm text-gray-400 mb-3">Failure Probability</h3>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className={`text-4xl font-bold font-mono ${riskColor}`}>
                        {percentage}%
                    </div>
                    <div className={`text-sm font-semibold mt-2 uppercase tracking-wide ${riskColor}`}>
                        {riskLevel} Risk
                    </div>
                </div>

                {failureProbability >= 0.05 && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-warning">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Monitor closely</span>
                    </div>
                )}
            </div>
        </GlassCard>
    );
}
