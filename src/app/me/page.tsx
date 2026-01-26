import { SpatialCanvas } from "@/components/sections/SpatialCanvas";
import { getAllTimelineEvents } from "@/lib/timeline";

export default function MePage() {
    const events = getAllTimelineEvents();

    return (
        <div className="w-full h-[calc(100vh-220px)] overflow-hidden bg-[#050505] rounded-2xl border border-white/5 mx-auto max-w-[98%]">
            <SpatialCanvas events={events} />
        </div>
    );
}
