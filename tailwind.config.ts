import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-space': '#000000',
                'surface': '#0A0A0A',
                'ai-primary': '#00FF41',
                'success': '#00FF41',
                'warning': '#39FF14',
                'critical': '#FF0000',
                'accent-green': '#00FF41',
                'accent-red': '#FF0000',
                'dark-green': '#003B00',
            },
            fontFamily: {
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'SF Pro Display',
                    'SF Pro Text',
                    'system-ui',
                    'sans-serif'
                ],
                mono: [
                    'SF Mono',
                    'Monaco',
                    'Menlo',
                    'monospace'
                ],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'glow-green': 'glowGreen 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 255, 65, 0.5), 0 0 10px rgba(0, 255, 65, 0.3)' },
                    '100%': { boxShadow: '0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.5)' },
                },
                glowGreen: {
                    '0%': { boxShadow: '0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.4)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 255, 65, 1), 0 0 40px rgba(0, 255, 65, 0.6)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
