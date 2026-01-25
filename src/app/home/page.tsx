import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";

export default function Home() {
    return (
        <div className="flex flex-col gap-0 pb-0">
            <Hero />
            <BentoGrid />
        </div>
    );
}
