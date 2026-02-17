"use client";

import GlassCard from "@/components/ui/GlassCard";
import { generateDriftData } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

export default function BehavioralDrift() {
    const data = generateDriftData();

    return (
        <GlassCard>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Behavioral Drift Analysis</h2>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-ai-primary"></div>
                            <span className="text-gray-400">Normal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-warning"></div>
                            <span className="text-gray-400">Drift Detected</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="driftGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="time"
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                                interval={9}
                            />
                            <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="normal"
                                stroke="#6366F1"
                                strokeWidth={2}
                                fill="url(#normalGradient)"
                            />
                            <Area
                                type="monotone"
                                dataKey="drift"
                                stroke="#F59E0B"
                                strokeWidth={2}
                                fill="url(#driftGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                    Multivariate correlation showing deviation from normal behavior patterns
                </div>
            </div>
        </GlassCard>
    );
}
