"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="flex flex-col justify-start pb-4">
            <div className="max-w-3xl mx-auto px-6 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8 text-base text-muted-foreground leading-relaxed font-mono text-justify"
                >
                    <p>
                        Namaste! sorohere, a CS student learning stuff for fun. <br />
                        Into cinema, photography, music, and random hobbies.
                    </p>

                    <p className="text-foreground font-medium">
                        step into my little slice of the internet!
                    </p>

                    <p>
                        I build models (the nerdy kind, not the runway ones) <br />
                        obsessed with ML, code, and finding patterns in chaos. <br />
                        random projects and quirky experiments.
                    </p>

                    <p>
                        -transfer learning? obviously! DM <a href="https://twitter.com/sorohere" target="_blank" className="text-accent hover:text-white transition-colors">sorohere</a> on X.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
