import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import CTA from "@/components/landing/CTA";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Benefits />
            <CTA />
        </div>
    );
}
