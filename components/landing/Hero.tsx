"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
            {/* Animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent-green/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-critical/20 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dark-green/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                className="relative z-10 max-w-6xl mx-auto text-center"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 mb-8">
                    <Sparkles className="w-4 h-4 text-accent-green" />
                    <span className="text-sm text-accent-green font-medium">AI-Powered Predictive Analytics</span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    variants={staggerItem}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                >
                    Predict System Failures
                    <br />
                    <span className="gradient-text">Before They Happen</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={staggerItem}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Advanced AI detects silent system degradation and behavioral drift,
                    giving you hours of warning before critical failures occur.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={staggerItem}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button className="group px-8 py-4 bg-accent-green text-black hover:bg-accent-green/90 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent-green/50 flex items-center gap-2">
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 glass-card glass-card-hover rounded-xl font-semibold text-lg">
                        Watch Demo
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={staggerItem}
                    className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
                >
                    <div className="glass-card rounded-2xl p-6">
                        <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
                        <div className="text-sm text-gray-400">Prediction Accuracy</div>
                    </div>
                    <div className="glass-card rounded-2xl p-6">
                        <div className="text-4xl font-bold gradient-text mb-2">2-4hrs</div>
                        <div className="text-sm text-gray-400">Early Warning</div>
                    </div>
                    <div className="glass-card rounded-2xl p-6">
                        <div className="text-4xl font-bold gradient-text mb-2">Zero</div>
                        <div className="text-sm text-gray-400">False Positives</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-3 bg-white/40 rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
