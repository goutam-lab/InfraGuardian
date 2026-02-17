import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
    return (
        <div className="grid grid-cols-4 gap-6 auto-rows-[280px]">
            {children}
        </div>
    );
}
