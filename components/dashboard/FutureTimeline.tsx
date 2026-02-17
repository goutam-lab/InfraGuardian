"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useDashboardStore } from "@/store/dashboardStore";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import { Clock } from "lucide-react";

export default function FutureTimeline() {
    const metrics = useDashboardStore((state) => state.metrics);
    const [selectedTime, setSelectedTime] = useState(0); // 0 = now, 10 = 10min, 30 = 30min, 60 = 1hr

    // Combine historical and predicted CPU data for timeline
    const historicalData = metrics.cpu.history.slice(-30).map((point, idx) => ({
        time: -30 + idx,
        value: point.value,
        type: 'historical'
    }));

    const predictedData = metrics.cpu.predicted.map((point, idx) => ({
        time: idx + 1,
        value: point.value,
        type: 'predicted'
    }));

    const timelineData = [...historicalData, ...predictedData];

    const timeOptions = [
        { label: 'Now', value: 0 },
        { label: '+10m', value: 10 },
        { label: '+30m', value: 30 },
        { label: '+1h', value: 60 },
    ];

    return (
        <GlassCard>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-ai-primary" />
                        <h2 className="text-lg font-semibold">Predictive Timeline</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {timeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedTime(option.value)}
                                className={`
                  px-3 py-1 rounded-lg text-xs font-medium transition-all
                  ${selectedTime === option.value
                                        ? 'bg-ai-primary text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }
                `}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timelineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <XAxis
                                dataKey="time"
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                                tickFormatter={(value) => value === 0 ? 'Now' : value > 0 ? `+${value}m` : `${value}m`}
                            />
                            <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                                labelFormatter={(value) => value === 0 ? 'Now' : value > 0 ? `+${value} min` : `${value} min`}
                            />
                            <ReferenceLine
                                x={0}
                                stroke="#6366F1"
                                strokeWidth={2}
                                label={{ value: 'Present', position: 'top', fill: '#6366F1', fontSize: 11 }}
                            />
                            {selectedTime > 0 && (
                                <ReferenceLine
                                    x={selectedTime}
                                    stroke="#F59E0B"
                                    strokeDasharray="3 3"
                                    strokeWidth={2}
                                />
                            )}
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#10B981"
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray={(point: any) => point.type === 'predicted' ? '5 5' : '0'}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-success"></div>
                            <span className="text-gray-400">Historical</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-success border-dashed" style={{ borderTop: '1px dashed' }}></div>
                            <span className="text-gray-400">Predicted</span>
                        </div>
                    </div>
                    <span className="text-gray-500">CPU Usage Forecast</span>
                </div>
            </div>
        </GlassCard>
    );
}
