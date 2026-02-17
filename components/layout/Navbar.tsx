"use client";

import { motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = ['Features', 'How It Works', 'Pricing', 'Docs'];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-7xl mx-auto glass-card rounded-2xl px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-green to-dark-green flex items-center justify-center">
                            <Brain className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold">PredictAI</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                            Sign In
                        </button>
                        <button className="px-6 py-2 bg-accent-green text-black hover:bg-accent-green/90 rounded-lg font-semibold transition-all hover:scale-105">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pt-4 border-t border-white/10"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <button className="px-6 py-2 bg-accent-green text-black hover:bg-accent-green/90 rounded-lg font-semibold transition-all w-full">
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
