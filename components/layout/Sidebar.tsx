"use client";

import {
    LayoutDashboard,
    Brain,
    Bell,
    Settings,
    BookOpen,
    User
} from "lucide-react";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Brain, label: "Models", active: false },
    { icon: Bell, label: "Alerts", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: BookOpen, label: "Docs", active: false },
];

export default function Sidebar() {
    return (
        <aside className="w-20 bg-surface border-r border-white/10 flex flex-col items-center py-6">
            {/* Logo */}
            <div className="mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ai-primary to-purple-600 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Navigation Icons */}
            <nav className="flex-1 flex flex-col gap-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.label}
                            className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                transition-all duration-200
                ${item.active
                                    ? 'bg-ai-primary/20 text-ai-primary border border-ai-primary/50'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
              `}
                            title={item.label}
                        >
                            <Icon className="w-5 h-5" />
                        </button>
                    );
                })}
            </nav>

            {/* Profile */}
            <div className="mt-auto">
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center hover:ring-2 hover:ring-ai-primary/50 transition-all">
                    <User className="w-5 h-5 text-white" />
                </button>
            </div>
        </aside>
    );
}
