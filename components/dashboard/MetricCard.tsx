"use client";

import GlassCard from "@/components/ui/GlassCard";
import { useDashboardStore } from "@/store/dashboardStore";
import { TrendDirection, MetricType } from "@/types";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: number;
    unit: string;
    trend: TrendDirection;
    metricType: MetricType;
}

export default function MetricCard({ title, value, unit, trend, metricType }: MetricCardProps) {
    const metrics = useDashboardStore((state) => state.metrics);
    const metricData = metrics[metricType];

    // Prepare sparkline data
    const sparklineData = metricData.history.slice(-20).map((point) => ({
        value: point.value
    }));

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
    const trendColor = trend === 'up' ? 'text-critical' : trend === 'down' ? 'text-success' : 'text-gray-400';

    return (
        <GlassCard className="group cursor-pointer">
            <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm text-gray-400">{title}</h3>
                    <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold font-mono">
                        {value.toFixed(metricType === 'errors' ? 2 : 1)}
                    </span>
                    <span className="text-sm text-gray-400">{unit}</span>
                </div>

                {/* Sparkline */}
                <div className="flex-1 -mx-2 opacity-40 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#6366F1"
                                strokeWidth={1.5}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                    Last 20 minutes
                </div>
            </div>
        </GlassCard>
    );
}
