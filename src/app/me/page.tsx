export default function MePage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-8">soro.exe</h1>
            <div className="prose prose-invert max-w-none font-mono">
                <p className="text-xl text-muted-foreground leading-relaxed">
                    안녕! i&apos;m soro <br />just a regular CS student figuring out life, one debug
                    at a time. part-time movie buff and occasional existential crisis haver.
                    i&apos;m out here trying to make my neurons and neural networks fire in sync.
                </p>

                <p className="text-xl text-muted-foreground leading-relaxed mt-6">
                    Currently fine-tuning my skills in: ML (teaching robots to think for me),
                    Python (the snek that does math), C/C++ (for when Python needs speed), DS
                    & Algos (fancy ways to organize my chaos), OS (making computers talk to
                    themselves), GNN (turning graphs into more than nodes), and Quantization
                    (shrinking models down, without losing their magic).
                </p>

                <p className="text-xl text-muted-foreground leading-relaxed mt-6 italic">
                    last updated: whenever my coffee cup is empty.
                </p>

                <p className="text-xl text-muted-foreground leading-relaxed mt-6">
                    when not coding: lost in movies that make me question reality, listening
                    to music that fuels my soul, and and enjoying the <a href="https://www.youtube.com/watch?v=HUECWi5pX7o" target="_blank" className="text-accent hover:underline">little things</a>.
                </p>

                <div className="mt-12 pt-12 border-t border-white/10">
                    <p className="text-lg italic">
                        My code and my life, both are works in progress, iterating and<br />
                        adjusting weights along the way.
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                        &copy; 2025 built with: love, GPTs, and caffeine.
                    </p>
                </div>
            </div>
        </div>
    );
}
