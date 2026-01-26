import { SpatialCanvas } from "@/components/sections/SpatialCanvas";
import { getAllTimelineEvents } from "@/lib/timeline";

export default function MePage() {
    const events = getAllTimelineEvents();

    return (
        <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#050505]">
            <SpatialCanvas events={events} />
        </div>
    );
}
