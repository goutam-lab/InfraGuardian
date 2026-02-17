"use client";

import GlassCard from "@/components/ui/GlassCard";
import { useDashboardStore } from "@/store/dashboardStore";
import { Brain, CheckCircle } from "lucide-react";

export default function ActiveModel() {
    const { activeModel } = useDashboardStore();

    return (
        <GlassCard>
            <div className="flex flex-col h-full">
                <h3 className="text-sm text-gray-400 mb-3">Active Model</h3>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-ai-primary/20 flex items-center justify-center mb-3">
                        <Brain className="w-8 h-8 text-ai-primary" />
                    </div>

                    <div className="text-xl font-bold font-mono text-ai-primary">
                        {activeModel}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                        Running
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-success">
                    <CheckCircle className="w-3 h-3" />
                    <span>Operational</span>
                </div>
            </div>
        </GlassCard>
    );
}
