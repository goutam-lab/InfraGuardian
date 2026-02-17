"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 via-dark-green/20 to-critical/20 animate-gradient" />
            <div className="absolute inset-0 bg-black/80" />

            <motion.div
                className="relative z-10 max-w-5xl mx-auto text-center"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div
                    variants={staggerItem}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
                >
                    <Sparkles className="w-4 h-4 text-ai-primary" />
                    <span className="text-sm text-ai-primary font-medium">Start Your Free Trial</span>
                </motion.div>

                <motion.h2
                    variants={staggerItem}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                    Ready to Eliminate
                    <br />
                    <span className="gradient-text">Unexpected Failures?</span>
                </motion.h2>

                <motion.p
                    variants={staggerItem}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
                >
                    Join hundreds of teams who sleep better knowing AI is watching their systems
                </motion.p>

                <motion.div
                    variants={staggerItem}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                >
                    <button className="group px-10 py-5 bg-accent-green text-black hover:bg-accent-green/90 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl flex items-center gap-2">
                        Get Started Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-10 py-5 glass-card glass-card-hover rounded-xl font-semibold text-lg">
                        Talk to Sales
                    </button>
                </motion.div>

                <motion.div
                    variants={staggerItem}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Cancel anytime</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
