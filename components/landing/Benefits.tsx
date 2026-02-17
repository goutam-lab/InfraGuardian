"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { CheckCircle2 } from "lucide-react";

const benefits = [
    {
        metric: "99.9%",
        label: "Uptime Improvement",
        description: "Prevent outages before they impact users",
    },
    {
        metric: "80%",
        label: "Faster MTTR",
        description: "Reduce mean time to resolution dramatically",
    },
    {
        metric: "10x",
        label: "ROI in Year 1",
        description: "Cost savings from prevented downtime",
    },
    {
        metric: "4hrs",
        label: "Early Warning",
        description: "Average lead time before failures",
    },
];

const outcomes = [
    "Eliminate unexpected production outages",
    "Reduce on-call firefighting by 90%",
    "Increase team productivity and morale",
    "Build customer trust with reliability",
    "Scale confidently without fear",
    "Sleep better knowing AI has your back",
];

export default function Benefits() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 px-6 relative">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div variants={staggerItem} className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Measurable <span className="gradient-text">Impact</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Real results from companies using predictive AI
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <motion.div
                    variants={staggerItem}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="glass-card glass-card-hover rounded-2xl p-8 text-center group"
                        >
                            <div className="text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform">
                                {benefit.metric}
                            </div>
                            <div className="text-lg font-semibold mb-2">{benefit.label}</div>
                            <div className="text-sm text-gray-400">{benefit.description}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Outcomes */}
                <motion.div variants={staggerItem} className="glass-card rounded-3xl p-12">
                    <h3 className="text-3xl font-bold mb-8 text-center">What You Get</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {outcomes.map((outcome, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                                <span className="text-lg text-gray-300">{outcome}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
