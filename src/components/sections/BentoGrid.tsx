"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Code2, Cpu, Mountain } from "lucide-react";

const cards = [
    {
        id: "about",
        colSpan: "col-span-1 md:col-span-2",
        content: (
            <div className="h-full flex flex-col justify-between p-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Core Philosophy</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-mono">
                        "Live beyond life. Be beyond being. Exist beyond existence."
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-2">
                        Not to judge. Not to get offended. Not to react.
                    </p>
                </div>
                <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent">Saurabh</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent">India</span>
                </div>
            </div>
        )
    },
    {
        id: "linkedin",
        colSpan: "col-span-1",
        href: "https://linkedin.com/in/sorohere",
        content: (
            <div className="h-full flex flex-col items-center justify-center p-6 group hover:bg-[#0077B5]/10 transition-colors">
                <Linkedin className="w-8 h-8 text-muted-foreground group-hover:text-[#0077B5] transition-colors mb-2" />
                <span className="text-sm font-medium text-white">LinkedIn</span>
            </div>
        )
    },
    {
        id: "github",
        colSpan: "col-span-1",
        href: "https://github.com/sorohere",
        content: (
            <div className="h-full flex flex-col items-center justify-center p-6 group hover:bg-white/10 transition-colors">
                <Github className="w-8 h-8 text-muted-foreground group-hover:text-white transition-colors mb-2" />
                <span className="text-sm font-medium text-white">GitHub</span>
            </div>
        )
    },
    {
        id: "stack",
        colSpan: "col-span-1 md:col-span-2",
        content: (
            <div className="h-full p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Domain</h3>
                    <p className="text-xs text-muted-foreground">AI • Machine Learning • Speech</p>
                </div>
                <div className="flex gap-3 text-muted-foreground">
                    <Code2 className="w-6 h-6 hover:text-accent transition-colors" />
                    <Cpu className="w-6 h-6 hover:text-accent transition-colors" />
                    <div className="w-px h-6 bg-white/10" />
                    <span className="text-xs font-mono self-center">VAD • CV • TFLite • NLP</span>
                </div>
            </div>
        )
    },
    {
        id: "focus",
        colSpan: "col-span-1 md:col-span-2",
        content: (
            <div className="h-full p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Focus</span>
                    </div>
                    <p className="text-sm font-medium text-white truncate max-w-[200px]">
                        Data @ IBM & High Altitude Ops
                    </p>
                </div>
            </div>
        )
    }
];

export function BentoGrid() {
    return (
        <section className="pt-0 pb-20 max-w-4xl mx-auto px-6 space-y-4">
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`glass-panel rounded-2xl overflow-hidden relative group ${card.colSpan}`}
                    >
                        {card.href ? (
                            <Link href={card.href} target="_blank" className="block h-full w-full">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-4 h-4 text-white/50" />
                                </div>
                                {card.content}
                            </Link>
                        ) : (
                            card.content
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Terminal Player Strip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-4 gap-4"
            >
                <div className="flex items-center gap-4 w-full md:w-auto overflow-hidden">
                    {/* Terminal Status */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Music_Daemon</span>
                    </div>

                    {/* Scrolling Track Info */}
                    <div className="flex flex-col font-mono text-sm leading-tight min-w-0">
                        <div className="flex items-center gap-2 text-white">
                            <span className="text-muted-foreground">{">"}</span>
                            <span className="truncate">Daydreaming</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <span className="opacity-0">{"<"}</span>
                            <span className="truncate">Radiohead // A Moon Shaped Pool</span>
                        </div>
                    </div>
                </div>

                {/* Right: Retro Visualizer & Time */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="font-mono text-xs text-muted-foreground">
                        <span className="text-white">02:43</span> / 06:24
                    </div>

                    <div className="flex items-end gap-1 h-8 opacity-70">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: ["20%", "80%", "40%", "90%", "30%"],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 0.4 + Math.random() * 0.3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: i * 0.05
                                }}
                                className="w-1 bg-accent rounded-sm"
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
