"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
    { name: "home", path: "/home" },
    { name: "post", path: "/blog" },
    { name: "about", path: "/about" },
    { name: "me", path: "/me" },
];

export function Navbar() {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 100], [1, 0.6]);
    const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

    if (isAdmin) return null;

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ opacity, scale }}
                className="pointer-events-auto bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-2xl flex items-center gap-3 md:gap-8 transition-all duration-300 hover:!opacity-100 hover:!scale-100"
            >
                {/* Logo */}
                <Link href="/home" className="text-lg md:text-xl font-bold text-white hover:text-accent transition-colors tracking-tight">
                    soro<span className="text-white/50 font-normal hidden md:inline">.ax</span>
                </Link>

                {/* Divider */}
                <div className="w-px h-3 md:h-4 bg-white/10" />

                {/* Links */}
                <div className="flex gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.path) || (item.path === "/home" && pathname === "/");
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    "relative px-3 md:px-4 py-1.5 text-xs md:text-sm font-mono transition-colors rounded-full",
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-glow"
                                        className="absolute inset-0 rounded-full bg-accent/10 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>
        </header>
    );
}
