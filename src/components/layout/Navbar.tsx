"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { name: "home", path: "/home" },
    { name: "post", path: "/blog" },
    { name: "about", path: "/about" },
    { name: "me", path: "/me" },
];

export function Navbar() {
    const pathname = usePathname();

    // Breadcrumb logic
    const isHome = pathname === "/home";
    const isBlog = pathname.startsWith("/blog");
    const isAbout = pathname === "/about";
    const isMe = pathname === "/me";
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) return null;

    return (
        <header className="w-full max-w-3xl mx-auto px-6 pt-20 pb-12">
            <div className="flex flex-col gap-2 items-start">
                <Link href="/home" className="text-2xl font-bold text-white">
                    soro
                </Link>

                <nav className="flex gap-2 text-lg font-mono">
                    {isHome ? (
                        // Home page nav
                        navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="text-accent hover:text-white transition-colors mr-4"
                            >
                                {item.name}
                            </Link>
                        ))
                    ) : (
                        // Breadcrumbs for subpages
                        <div className="flex items-center text-accent">
                            <Link href="/home" className="hover:text-white transition-colors">home</Link>
                            <span className="text-muted-foreground">.</span>
                            {isBlog && (
                                <Link href="/blog" className="text-accent hover:text-white transition-colors">
                                    post
                                </Link>
                            )}
                            {isAbout && (
                                <Link href="/about" className="text-accent hover:text-white transition-colors">
                                    about
                                </Link>
                            )}
                            {isMe && (
                                <Link href="/me" className="text-accent hover:text-white transition-colors">
                                    me
                                </Link>
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
