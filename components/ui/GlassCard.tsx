import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export default function GlassCard({
    children,
    className = "",
    hover = true,
    glow = false
}: GlassCardProps) {
    return (
        <div
            className={`
        glass-card rounded-2xl p-6 h-full
        ${hover ? 'glass-card-hover' : ''}
        ${glow ? 'animate-glow' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
