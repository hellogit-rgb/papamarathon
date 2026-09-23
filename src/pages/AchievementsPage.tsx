import { useEffect, useState } from 'react';
import { fetchAchievements } from '@/lib/queries';
import type { Achievement } from '@/lib/types';
import { formatDate } from '@/lib/stats';
import { ErrorState, EmptyState, InlineLoader } from '@/components/States';
import { RevealText } from '@/components/Motion';

export default function AchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { fetchAchievements().then(setItems).catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load achievements.')).finally(() => setLoading(false)); }, []);
  if (loading) return <div className="pt-32"><InlineLoader label="Loading milestones" /></div>;
  if (error) return <div className="pt-32"><ErrorState message={error} /></div>;
  return <main className="min-h-screen bg-ink px-6 pb-32 pt-24"><section className="mx-auto max-w-editorial py-20 md:py-32"><p className="font-heading text-xs uppercase tracking-[0.3em] text-copper">Milestones</p><h1 className="mt-4 font-display text-7xl leading-[0.86] text-cream md:text-9xl"><RevealText>ACHIEVEMENTS</RevealText></h1><div className="mt-20">{items.length ? items.map((item) => <article key={item.id} className="border-t border-stone/60 py-8"><p className="font-display text-2xl text-copper">{formatDate(item.achievement_date)}</p><h2 className="mt-2 font-heading text-2xl uppercase tracking-wider text-cream">{item.title}</h2>{item.description && <p className="mt-3 max-w-2xl leading-relaxed text-bone/50">{item.description}</p>}</article>) : <EmptyState title="The next milestone is unwritten" message="Achievements will appear here as they are added to the archive." />}</div></section></main>;
}
