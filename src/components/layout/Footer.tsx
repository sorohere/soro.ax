"use client";

import { Github, Twitter, Mail, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) return null;

    return (
        <footer className="w-full border-t border-white/5 bg-black mt-auto">
            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Left: Copyright */}
                <div className="flex flex-col gap-1 text-center md:text-left">
                    <p className="text-sm font-mono text-muted-foreground">
                        © {new Date().getFullYear()} soro.ax
                    </p>
                    <p className="text-xs text-white/20">
                        San Francisco, CA • UTC {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                    </p>
                </div>

                {/* Right: Socials */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/sorohere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        <Github size={18} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://twitter.com/sorohere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#1DA1F2] transition-colors flex items-center gap-2 group"
                    >
                        <Twitter size={18} />
                        <span className="sr-only">Twitter</span>
                    </a>
                    <a
                        href="mailto:saurabh.kushwaha.dev@gmail.com"
                        className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                        <Mail size={18} />
                        <span className="sr-only">Email</span>
                    </a>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">System Normal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
