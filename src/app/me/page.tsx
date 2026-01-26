import { FilmStrip } from "@/components/sections/FilmStrip";
import { getAllTimelineEvents } from "@/lib/timeline";

export default function MePage() {
    const events = getAllTimelineEvents();

    return (
        <div className="bg-[#050505] min-h-screen">
            <FilmStrip events={events} />
        </div>
    );
}
