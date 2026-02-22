"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold gradient-text">DTI</Link>
                
                <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-mono">
                    <Link href="/#features" className="hover:text-accent-green transition-colors">Features</Link>
                    <Link href="/#how-it-works" className="hover:text-accent-green transition-colors">Process</Link>
                    <Link href="/#pricing" className="hover:text-accent-green transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="px-5 py-2 rounded-full border border-accent-green text-accent-green text-sm font-bold hover:bg-accent-green hover:text-black transition-all">
                                DASHBOARD
                            </Link>
                            <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-mono">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="px-6 py-2 rounded-full bg-accent-green text-black font-bold hover:bg-white transition-all text-sm uppercase">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}