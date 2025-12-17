"use client";

import { Github, Twitter, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const isHome = pathname === "/" || pathname === "/home";
    const isBlog = pathname.startsWith("/blog");
    const isAbout = pathname === "/about";
    const isMe = pathname === "/me";

    const isAdmin = pathname.startsWith("/admin");

    if (isBlog || isAbout || isMe) return null;

    if (isAdmin) {
        return (
            <footer className="mt-0">
                <div className="max-w-3xl mx-auto px-6 py-32 flex justify-center">
                    <p className="text-sm text-[#888888]">
                        &copy; {new Date().getFullYear()} soro. Built with love and gpt&apos;s.
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="mt-0">
            <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-6">
                <div className="flex gap-6">
                    <a
                        href="https://github.com/sorohere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-white transition-colors"
                    >
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://twitter.com/sorohere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-white transition-colors"
                    >
                        <Twitter size={20} />
                        <span className="sr-only">Twitter</span>
                    </a>
                    <a
                        href="mailto:saurabh.kushwaha.dev@gmail.com"
                        className="text-accent hover:text-white transition-colors"
                    >
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
                {!isHome && (
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} soro. Built with love and gpt&apos;s.
                    </p>
                )}
            </div>
        </footer>
    );
}
