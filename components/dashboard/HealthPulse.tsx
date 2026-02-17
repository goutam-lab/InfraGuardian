"use client";

import GlassCard from "@/components/ui/GlassCard";
import { useDashboardStore } from "@/store/dashboardStore";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function HealthPulse() {
    const { systemHealth, aiConfidence, driftDetected } = useDashboardStore();

    const healthValue = Math.round(systemHealth * 10) / 10;
    const remainingHealth = 100 - healthValue;

    const data = [
        { name: 'Health', value: healthValue },
        { name: 'Risk', value: remainingHealth }
    ];

    // Determine color based on health and drift
    const getHealthColor = () => {
        if (driftDetected) return '#F59E0B'; // warning
        if (healthValue >= 95) return '#10B981'; // success
        if (healthValue >= 85) return '#F59E0B'; // warning
        return '#EF4444'; // critical
    };

    const healthColor = getHealthColor();

    return (
        <GlassCard className="relative overflow-hidden">
            <div className="flex flex-col h-full">
                <h2 className="text-lg font-semibold mb-4">System Health</h2>

                <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                        <ResponsiveContainer width={240} height={240}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    <Cell fill={healthColor} className="glow-ring" />
                                    <Cell fill="rgba(255,255,255,0.05)" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div
                                className={`text-5xl font-bold font-mono ${driftDetected ? 'animate-pulse-slow' : ''}`}
                                style={{ color: healthColor }}
                            >
                                {healthValue}%
                            </div>
                            <div className="text-sm text-gray-400 mt-1">Health Score</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">AI Confidence</span>
                        <span className={`
              text-sm font-semibold uppercase tracking-wide
              ${aiConfidence === 'high' ? 'text-success' : ''}
              ${aiConfidence === 'medium' ? 'text-warning' : ''}
              ${aiConfidence === 'low' ? 'text-critical' : ''}
            `}>
                            {aiConfidence}
                        </span>
                    </div>
                    {driftDetected && (
                        <div className="mt-2 text-xs text-warning flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                            Behavioral drift detected
                        </div>
                    )}
                </div>
            </div>
        </GlassCard>
    );
}
