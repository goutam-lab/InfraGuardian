'use client'

import { useState } from 'react'
import { createClient } from '@/supabase/client'
import { useRouter } from 'next/navigation'
import GlassCard from '@/components/ui/GlassCard'
import Navbar from '@/components/layout/Navbar'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [github, setGithub] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    if (isSignUp) {
      // SIGN UP LOGIC
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { 
          data: { 
            full_name: fullName,
            github_username: github 
          },
          emailRedirectTo: `${window.location.origin}/auth/callback` 
        }
      })

      if (error) {
        setMessage(error.message)
      } else if (data.user && !data.session) {
        setMessage('Registration successful! Please check your email for the verification link.')
      } else {
        router.push('/dashboard')
      }
    } else {
      // LOGIN LOGIC
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center pt-32 pb-12 px-6">
        <GlassCard className="max-w-md w-full relative z-10 border-accent-green/20">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isSignUp ? 'CREATE' : 'SYSTEM'} <span className="gradient-text">{isSignUp ? 'ACCOUNT' : 'ACCESS'}</span>
          </h2>
          
          {message && (
            <div className={`p-3 rounded-lg mb-4 text-xs text-center border ${message.includes('successful') || message.includes('check') ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="FULL NAME"
                  required
                  className="w-full p-3 rounded-lg bg-surface border border-accent-green/10 focus:border-accent-green outline-none text-sm font-mono"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="GITHUB USERNAME"
                  required
                  className="w-full p-3 rounded-lg bg-surface border border-accent-green/10 focus:border-accent-green outline-none text-sm font-mono"
                  onChange={(e) => setGithub(e.target.value)}
                />
              </>
            )}
            
            <input
              type="email"
              placeholder="NETWORK EMAIL"
              required
              className="w-full p-3 rounded-lg bg-surface border border-accent-green/10 focus:border-accent-green outline-none text-sm font-mono"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              required
              className="w-full p-3 rounded-lg bg-surface border border-accent-green/10 focus:border-accent-green outline-none text-sm font-mono"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-green text-black font-bold py-3 rounded-xl hover:bg-white transition-all text-xs uppercase disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : isSignUp ? 'REGISTER ID' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-gray-500 hover:text-accent-green transition-colors font-mono uppercase"
            >
              {isSignUp ? 'Already have an ID? Login' : 'Need an ID? Register here'}
            </button>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}