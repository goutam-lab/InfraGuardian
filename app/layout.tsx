import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Predictive AI Dashboard",
    description: "AI-Based System for Early Detection of Silent System Failures",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
