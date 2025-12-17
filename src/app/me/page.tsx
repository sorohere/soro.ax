import { Timeline } from "@/components/sections/Timeline";
import { getAllTimelineEvents } from "@/lib/timeline";

export default function MePage() {
    const events = getAllTimelineEvents();

    return (
        <div className="flex flex-col gap-0 pb-0">
            <section className="flex flex-col justify-start pb-4">
                <div className="max-w-3xl mx-auto px-6 w-full">
                    <Timeline events={events} />
                </div>
            </section>
        </div>
    );
}
