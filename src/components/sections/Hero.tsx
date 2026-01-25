"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative pt-8 pb-3 flex flex-col justify-center items-center overflow-hidden aurora-bg">
            <div className="w-full max-w-4xl px-6 z-10 text-center">
                {/* Glitch Effect Name */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative inline-block -mb-2 md:-mb-6"
                >
                    <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-white leading-[0.8]">
                        soro
                        <span className="text-white/50">here</span>
                    </h1>
                </motion.div>

                {/* Minimal Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-muted-foreground font-mono max-w-full mx-auto tracking-wide font-medium"
                >
                    technologist in preparation.
                    <span className="text-accent"> explorer by intent.</span>
                </motion.p>
            </div>

        </section>
    );
}
