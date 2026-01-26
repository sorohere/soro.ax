import { SpatialCanvas } from "@/components/sections/SpatialCanvas";
import { getAllTimelineEvents } from "@/lib/timeline";

export default function MePage() {
    const events = getAllTimelineEvents();

    return (
        <div className="fixed inset-0 z-0 bg-[#050505]">
            <SpatialCanvas events={events} />
        </div>
    );
}
