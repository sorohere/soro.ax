"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TimelineEvent } from "@/lib/timeline";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";

interface MemoryNodeProps {
    event: TimelineEvent;
    x: number;
    y: number;
    rotation: number;
    index: number;
    totalNodes: number;
    onClick: (event: TimelineEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function MemoryNode({ event, x, y, rotation, index, totalNodes, onClick, onMouseEnter, onMouseLeave }: MemoryNodeProps) {
    // Determine variant based on content
    const isPolaroid = !!event.image;

    // Recent events (lower index) get higher z-index
    const baseZIndex = totalNodes - index;

    return (
        <motion.div
            className="absolute cursor-pointer group"
            style={{ zIndex: baseZIndex }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                left: x,
                top: y,
                rotate: rotation,
                opacity: 1,
                scale: 1
            }}
            whileHover={{ scale: 1.15, zIndex: 100 }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 1
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(event);
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isPolaroid ? (
                // Polaroid Style -> "Lab Evidence" Style
                <div className="bg-white p-2 pb-8 w-64 shadow-2xl transform transition-transform shadow-black/50 rotate-1">
                    <div className="relative aspect-square w-full bg-gray-100 overflow-hidden mb-3 transition-all duration-500 border border-gray-200">
                        {event.image ? (
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                                draggable={false}
                            />
                        ) : null}
                    </div>
                    <div className="font-mono text-black/80 font-bold text-xs uppercase tracking-tight text-center truncate px-2">
                        {event.title}
                    </div>
                    <div className="text-[9px] text-black/40 text-center mt-1 font-mono uppercase tracking-widest">
                        Fig. {event.year}
                    </div>
                </div>
            ) : (
                // Sticky Note -> "Data Card" Style
                <div className={cn(
                    "w-64 p-5 shadow-2xl backdrop-blur-md border border-white/10 flex flex-col justify-between h-64",
                    "bg-black/40 hover:bg-black/60 transition-colors"
                )}>
                    <div>
                        <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                            <span className="text-accent text-[10px] font-mono tracking-widest uppercase">
                                Log_{event.year}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        </div>

                        <h3 className="font-bold text-base leading-tight mb-2 text-white/90">
                            {event.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-4 font-mono leading-relaxed opacity-80">
                            {event.description.replace(/[#*_`]/g, '')}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] text-white/30 font-mono pt-3 group-hover:text-accent transition-colors">
                        <Maximize2 size={10} />
                        <span>EXPAND_NODE</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
