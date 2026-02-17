"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Brain, TrendingUp, Shield, Zap, Bell, BarChart3 } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI-Driven Detection",
        description: "Advanced LSTM models learn your system's normal behavior patterns and detect subtle deviations humans miss.",
    },
    {
        icon: TrendingUp,
        title: "Behavioral Drift Analysis",
        description: "Identifies gradual degradation and behavioral shifts before they escalate into critical failures.",
    },
    {
        icon: Shield,
        title: "Zero False Positives",
        description: "Multivariate correlation filtering eliminates noise and ensures only real threats trigger alerts.",
    },
    {
        icon: Zap,
        title: "Real-Time Monitoring",
        description: "Continuous analysis of CPU, memory, latency, errors, and traffic with millisecond precision.",
    },
    {
        icon: Bell,
        title: "Smart Alerting",
        description: "Prioritized notifications with context and recommendations for rapid response.",
    },
    {
        icon: BarChart3,
        title: "Predictive Forecasting",
        description: "See into the future with ML-powered predictions of system states hours ahead.",
    },
];

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 px-6 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-green/10 to-black" />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div variants={staggerItem} className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Built for <span className="gradient-text">Production</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Enterprise-grade AI that fits seamlessly into your existing infrastructure
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="group glass-card glass-card-hover rounded-2xl p-8 relative overflow-hidden"
                            >
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-green/0 to-accent-green/0 group-hover:from-accent-green/10 group-hover:to-dark-green/10 transition-all duration-500" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-green/20 transition-all duration-300">
                                        <Icon className="w-7 h-7 text-accent-green" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
