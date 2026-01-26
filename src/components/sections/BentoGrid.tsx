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
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Core Philosophy</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed font-mono relative z-10">
                            "Live beyond life. Be beyond being. Exist beyond existence."
                        </p>
                    </div>
                    <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase border border-white/10 px-2 py-0.5 rounded h-fit">ID</span>
                </div>

                <div className="mt-3 flex flex-col gap-1">
                    <p className="text-muted-foreground/50 text-xs italic">
                        Not to judge. Not to get offended. Not to react.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "twitter",
        colSpan: "col-span-1",
        href: "https://x.com/sorohere",
        content: (
            <div className="h-full flex flex-col items-center justify-center p-6 group hover:bg-[#1DA1F2]/10 transition-colors relative">
                <div className="absolute top-4 left-4 text-[10px] text-white/20 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Connect</div>
                <Twitter className="w-8 h-8 text-muted-foreground group-hover:text-[#1DA1F2] transition-colors mb-2" />
                <span className="text-sm font-medium text-white">Twitter</span>
            </div>
        )
    },
    {
        id: "github",
        colSpan: "col-span-1",
        href: "https://github.com/sorohere",
        content: (
            <div className="h-full flex flex-col items-center justify-center p-6 group hover:bg-white/10 transition-colors relative">
                <div className="absolute top-4 left-4 text-[10px] text-white/20 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Git</div>
                <Github className="w-8 h-8 text-muted-foreground group-hover:text-white transition-colors mb-2" />
                <span className="text-sm font-medium text-white">GitHub</span>
            </div>
        )
    },
    {
        id: "stack",
        colSpan: "col-span-1 md:col-span-2",
        content: (
            <div className="h-full p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white">Domain</h3>
                    <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase border border-white/10 px-2 py-0.5 rounded">Tech</span>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Cpu className="w-4 h-4 text-accent/70" />
                        <span>AI / ML Core</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Code2 className="w-4 h-4 text-accent/70" />
                        <span>Speech & VAD</span>
                    </div>
                    <div className="w-full h-px bg-white/5 my-1" />
                    <span className="text-xs font-mono text-white/40">CV • TFLite • NLP • Systems</span>
                </div>
            </div>
        )
    },
    {
        id: "focus",
        colSpan: "col-span-1 md:col-span-2",
        content: (
            <div className="h-full p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <Mountain className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Focus</span>
                    </div>
                    <p className="text-sm font-medium text-white leading-tight">
                        Data @ IBM & High Altitude Ops
                    </p>
                    <p className="text-xs text-white/30 mt-1 font-mono">
                        (systems + self)
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

            {/* Terminal Player Strip - Reduced Opacity */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-3 gap-4 opacity-80 hover:opacity-100 transition-opacity"
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
                                    height: ["30%", "60%", "45%", "70%", "40%"],
                                    opacity: [0.6, 0.9, 0.6]
                                }}
                                transition={{
                                    duration: 1.2 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: i * 0.08
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
