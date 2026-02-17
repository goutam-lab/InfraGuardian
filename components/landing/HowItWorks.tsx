"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { Database, Brain, Eye, Rocket } from "lucide-react";

const steps = [
    {
        icon: Database,
        title: "Connect Your Systems",
        description: "Integrate with your existing infrastructure in minutes. Support for all major platforms and metrics sources.",
        side: "left",
    },
    {
        icon: Brain,
        title: "AI Learns Your Baseline",
        description: "Our LSTM models train on your historical data to understand normal behavior patterns and correlations.",
        side: "right",
    },
    {
        icon: Eye,
        title: "Continuous Monitoring",
        description: "Real-time analysis detects subtle behavioral drift and degradation across all metrics.",
        side: "left",
    },
    {
        icon: Rocket,
        title: "Predict & Prevent",
        description: "Get actionable alerts hours before failures, with confidence scores and recommended actions.",
        side: "right",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent-green/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-critical/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From integration to prediction in four simple steps
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-green via-warning to-critical hidden lg:block" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const stepRef = useRef(null);
                        const stepInView = useInView(stepRef, { once: true, margin: "-100px" });

                        return (
                            <motion.div
                                key={index}
                                ref={stepRef}
                                initial="hidden"
                                animate={stepInView ? "visible" : "hidden"}
                                className="relative mb-16 last:mb-0"
                            >
                                <div className={`flex flex-col lg:flex-row items-center gap-8 ${step.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                                    {/* Content */}
                                    <motion.div
                                        variants={step.side === 'left' ? slideInLeft : slideInRight}
                                        className="flex-1 glass-card glass-card-hover rounded-2xl p-8"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-green to-dark-green flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-8 h-8 text-black" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-accent-green font-semibold mb-2">Step {index + 1}</div>
                                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Center dot */}
                                    <motion.div
                                        variants={fadeInUp}
                                        className="hidden lg:flex w-4 h-4 rounded-full bg-gradient-to-br from-accent-green to-dark-green border-4 border-black flex-shrink-0 z-10"
                                    />

                                    {/* Spacer for alignment */}
                                    <div className="flex-1 hidden lg:block" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
