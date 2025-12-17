import { notFound } from "next/navigation";
import { VadEval } from "@/components/posts/VadEval";
import { Me } from "@/components/posts/Me";
import { MathsML } from "@/components/posts/MathsML";

export function generateStaticParams() {
    return [
        { slug: "vad-eval" },
        { slug: "me" },
        { slug: "maths-ml" },
    ];
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let Content;
    switch (slug) {
        case "vad-eval":
            Content = VadEval;
            break;
        case "me":
            Content = Me;
            break;
        case "maths-ml":
            Content = MathsML;
            break;
        default:
            notFound();
    }

    return (
        <div className="max-w-3xl mx-auto px-6 pb-15 font-mono">
            <Content />
            <div className="mt-6 pt-6 text-center text-[#888888]">
                <p className="text-sm">
                    &copy; 2025 built with: love, GPTs, and caffeine.
                </p>
            </div>
        </div>
    );
}
