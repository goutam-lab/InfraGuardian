import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/layout/Sidebar";
import BentoGrid from "@/components/layout/BentoGrid";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch the detailed profile from the public.profiles table
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Welcome, <span className="gradient-text uppercase tracking-tighter">
                                {profile?.full_name || user.email?.split('@')[0]}
                            </span>
                        </h1>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                            Linked Github: {profile?.github_username || 'Not Connected'}
                        </p>
                    </div>
                    <div className="px-4 py-2 bg-accent-green/10 border border-accent-green/20 rounded-lg">
                        <span className="text-accent-green text-xs font-mono">STATUS: AUTHENTICATED</span>
                    </div>
                </header>
                <BentoGrid />
            </main>
        </div>
    );
}