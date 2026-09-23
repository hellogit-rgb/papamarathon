import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchUpcoming } from '@/lib/queries';
import type { UpcomingMarathon } from '@/lib/types';
import { formatDate } from '@/lib/stats';
import Countdown from '@/components/Countdown';
import { ErrorState, InlineLoader, EmptyState } from '@/components/States';
import { RevealText } from '@/components/Motion';

export default function UpcomingPage() {
  const [races, setRaces] = useState<UpcomingMarathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcoming()
      .then(setRaces)
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load upcoming races.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-32"><InlineLoader label="Loading the next miles" /></div>;
  if (error) return <div className="pt-32"><ErrorState message={error} /></div>;

  return (
    <main className="bg-ink pt-24">
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-editorial">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-copper">The road ahead</p>
          <h1 className="mt-4 font-display text-7xl leading-[0.86] text-cream md:text-9xl"><RevealText>UPCOMING</RevealText></h1>
        </div>
      </section>
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-editorial">
          {races.length === 0 ? <EmptyState title="No upcoming races yet" message="The next starting line will be added here." /> : (
            <div className="divide-y divide-stone/60 border-y border-stone/60">
              {races.map((race, index) => (
                <motion.article key={race.id} className="grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }}>
                  <div>
                    <p className="font-display text-2xl text-copper">{formatDate(race.event_date)}</p>
                    <h2 className="mt-2 font-heading text-2xl uppercase tracking-wider text-cream md:text-4xl">{race.event_name}</h2>
                    <p className="mt-3 text-bone/45">{race.city ?? race.location} <span className="px-2 text-stone">/</span> {race.distance_km} km</p>
                    {race.notes && <p className="mt-5 max-w-lg leading-relaxed text-bone/55">{race.notes}</p>}
                  </div>
                  <div className="border-l border-copper/50 pl-6 md:min-w-[230px]">
                    <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-bone/40">Countdown</p>
                    <div className="mt-3"><Countdown targetDate={race.event_date} /></div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
