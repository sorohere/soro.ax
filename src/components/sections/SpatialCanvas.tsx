"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEvent } from "@/lib/timeline";
import { generateSpatialLayout, SpatialNode } from "@/lib/spatial-layout";
import { MemoryNode } from "./MemoryNode";
import { X, Calendar, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { cn } from "@/lib/utils";

interface SpatialCanvasProps {
    events: TimelineEvent[];
}

export function SpatialCanvas({ events }: SpatialCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
    const [scale, setScale] = useState(1);

    // 1. Group Years
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(events.map(e => e.year))).sort((a, b) => Number(b) - Number(a));
        return uniqueYears;
    }, [events]);

    const [activeYear, setActiveYear] = useState<string>(years[0] || new Date().getFullYear().toString());
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // 2. Filter & Layout for Active Year
    const activeNodes = useMemo(() => {
        const filtered = events.filter(e => e.year === activeYear);
        return generateSpatialLayout(filtered);
    }, [events, activeYear]);

    // 3. Dynamic Repulsion Layout
    const displayedNodes = useMemo(() => {
        if (hoveredIndex === null) return activeNodes;

        const hoveredNode = activeNodes[hoveredIndex];
        const repulsionRadius = 400; // Interaction range
        const repulsionStrength = 180; // How far to push

        return activeNodes.map((node, i) => {
            if (i === hoveredIndex) return node; // Hovered node stays

            const dx = node.x - hoveredNode.x;
            const dy = node.y - hoveredNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid div by zero

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) / repulsionRadius;
                const smoothForce = Math.pow(force, 2); // Easing for smoother falloff

                return {
                    ...node,
                    x: node.x + (dx / dist) * repulsionStrength * smoothForce,
                    y: node.y + (dy / dist) * repulsionStrength * smoothForce,
                };
            }
            return node;
        });
    }, [activeNodes, hoveredIndex]);

    // Reset view when switching years
    useEffect(() => {
        // Optional: Recentering animation logic could go here
    }, [activeYear]);

    const handleZoom = (delta: number) => {
        setScale(prev => Math.min(Math.max(prev + delta, 0.4), 2));
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#050505] cursor-grab active:cursor-grabbing selection:bg-transparent flex flex-col">

            {/* Header */}
            {/* Top Gradient Mask */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent z-40 pointer-events-none" />

            {/* Header */}
            <div className="absolute top-32 left-0 right-0 z-50 pointer-events-none flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-2xl">
                    open<span className="text-accent">_sky</span>
                </h1>
                <p className="text-xs text-muted-foreground/60 mt-1 font-mono tracking-wider drop-shadow-md">
                    {activeYear} Collection
                </p>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-32 right-8 z-50 flex flex-col gap-2 pointer-events-auto">
                <button
                    onClick={() => handleZoom(0.2)}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <Plus size={20} />
                </button>
                <button
                    onClick={() => handleZoom(-0.2)}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <Minus size={20} />
                </button>
            </div>

            {/* Canvas Area */}
            <div className="relative flex-grow w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeYear}
                        ref={containerRef}
                        className="absolute inset-0 w-full h-full origin-center touch-none"
                        drag
                        dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
                        dragElastic={0.1}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: scale, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    >
                        {/* Center Marker */}
                        <div className="absolute left-[50%] top-[50%] w-4 h-4 bg-accent/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        {/* Nodes */}
                        <div className="absolute left-[50%] top-[50%]">
                            {displayedNodes.map((node, i) => (
                                <MemoryNode
                                    key={node.slug}
                                    event={node}
                                    x={node.x}
                                    y={node.y}
                                    rotation={node.rotation}
                                    index={i}
                                    totalNodes={activeNodes.length}
                                    onClick={setSelectedEvent}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Gradient Mask */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-40 pointer-events-none" />

            {/* Year Switcher Dock */}
            <div className="absolute bottom-20 left-0 right-0 z-50 p-6 flex justify-center pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
                    <div className="flex gap-1">
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={cn(
                                    "px-3 py-1 rounded-full text-xs font-mono transition-all duration-300",
                                    activeYear === year
                                        ? "bg-white text-black font-bold scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                        : "text-white/50 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedEvent && (
                    <Lightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

// Lightbox Component (Copied/Adapted from FilmStrip for consistency but independent)
function Lightbox({ event, onClose }: { event: TimelineEvent, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl pointer-events-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left: Image Area */}
                <div className="w-full md:w-1/2 h-48 md:h-full relative bg-black">
                    {event.image ? (
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                            <Calendar className="w-16 h-16 text-white/10" />
                        </div>
                    )}
                </div>

                {/* Right: Content Area */}
                <div className="w-full md:w-1/2 flex flex-col h-full bg-[#0a0a0a]">
                    <div className="hidden md:block p-8 pb-0">
                        <div className="flex items-center gap-3 text-accent font-mono text-xs tracking-widest uppercase mb-4">
                            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long' })}</span>
                            <span className="w-px h-3 bg-white/20" />
                            <span>{event.year}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white leading-tight mb-2">{event.title}</h2>
                    </div>

                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
                        <div className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground/90">
                            <MarkdownRenderer content={event.description} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
