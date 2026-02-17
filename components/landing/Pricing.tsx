"use client";

import { Check } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const plans = [
    {
        name: "Starter",
        price: "$49",
        features: ["Up to 5 systems", "1-hour prediction window", "Email alerts", "7-day data retention"],
        highlight: false
    },
    {
        name: "Pro",
        price: "$199",
        features: ["Unlimited systems", "6-hour prediction window", "Slack & PagerDuty integration", "30-day data retention", "Custom LSTM training"],
        highlight: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["On-premise deployment", "Unlimited retention", "24/7 Dedicated support", "SLA guarantees"],
        highlight: false
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 px-6 bg-black relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold mb-6">Simple <span className="gradient-text">Pricing</span></h2>
                    <p className="text-xl text-gray-400">Scale your monitoring as you grow</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <GlassCard key={i} className={`flex flex-col ${plan.highlight ? 'border-accent-green ring-1 ring-accent-green' : ''}`}>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="text-4xl font-bold text-accent-green">{plan.price}<span className="text-lg text-gray-500">/mo</span></div>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3 text-gray-300">
                                        <Check className="w-5 h-5 text-accent-green" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-accent-green text-black hover:bg-warning' : 'bg-surface border border-accent-green/30 hover:border-accent-green'}`}>
                                Get Started
                            </button>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}