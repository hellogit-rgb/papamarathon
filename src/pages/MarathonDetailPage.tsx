import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchMarathon, fetchUpcoming } from '@/lib/queries';
import type { Marathon, UpcomingMarathon } from '@/lib/types';
import { formatDate, formatDuration } from '@/lib/stats';
import { InlineLoader, ErrorState, EmptyState } from '@/components/States';
import { RevealText } from '@/components/Motion';

export default function MarathonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [marathon, setMarathon] = useState<Marathon | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingMarathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([fetchMarathon(id), fetchUpcoming()])
      .then(([m, up]) => {
        setMarathon(m);
        setUpcoming(up);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-32"><InlineLoader label="Loading the race" /></div>;
  if (error) return <div className="pt-32"><ErrorState message={error} /></div>;
  if (!marathon) return <div className="pt-32"><EmptyState title="Race Not Found" message="This marathon may not have been published yet." /></div>;

  const stats = [
    { label: 'Distance', value: `${marathon.distance_km} km` },
    { label: 'Finish Time', value: formatDuration(marathon.finish_time) },
    { label: 'Average Pace', value: marathon.average_pace ?? '—' },
    { label: 'Position', value: marathon.position ? `#${marathon.position}` : '—' },
    { label: 'Elevation', value: marathon.elevation_m ? `${marathon.elevation_m} m` : '—' },
    { label: 'Weather', value: marathon.weather ?? '—' },
  ];

  const gallery = marathon.gallery_images ?? [];
  const nextRace = upcoming[0];

  return (
    <div className="pt-24">
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.img
          src={marathon.featured_image ?? ''}
          alt={marathon.event_name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p className="font-heading uppercase tracking-[0.3em] text-bone/70 text-xs mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {formatDate(marathon.event_date)} &middot; {marathon.city ?? marathon.location}
          </motion.p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95] max-w-4xl">
            <RevealText>{marathon.event_name}</RevealText>
          </h1>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-editorial px-6">
          <Link to="/marathons" className="inline-flex items-center gap-2 text-bone/50 hover:text-copper transition-colors text-sm font-heading uppercase tracking-widest mb-12">
            <ArrowLeft size={16} /> Back to Marathons
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-stone/40 border border-stone/40 mb-20">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="bg-ink p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <p className="font-display text-3xl text-cream mb-1">{s.value}</p>
                <p className="font-heading uppercase tracking-widest text-bone/40 text-[10px]">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {marathon.race_description && (
            <div className="max-w-3xl mb-20">
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-6"><RevealText>THE RACE</RevealText></h2>
              <p className="text-bone/60 leading-relaxed text-lg">{marathon.race_description}</p>
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mb-20">
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-8"><RevealText>GALLERY</RevealText></h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, i) => (
                  <motion.div key={i} className="overflow-hidden aspect-[4/3]" initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.7, delay: i * 0.06 }}>
                    <img src={img} alt={`Race photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {marathon.certificate_url && (
            <div className="mb-20">
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-8"><RevealText>CERTIFICATE</RevealText></h2>
              <a href={marathon.certificate_url} target="_blank" rel="noopener noreferrer" className="block max-w-2xl">
                <img src={marathon.certificate_url} alt="Race certificate" className="w-full border border-stone/50" loading="lazy" />
              </a>
            </div>
          )}

          {marathon.personal_reflection && (
            <div className="max-w-3xl mb-20">
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-6"><RevealText>WHAT I REMEMBER</RevealText></h2>
              <p className="text-bone/60 leading-relaxed text-lg italic">&ldquo;{marathon.personal_reflection}&rdquo;</p>
            </div>
          )}

          {nextRace && (
            <div className="border-t border-stone/50 pt-12">
              <p className="font-heading uppercase tracking-widest text-copper text-xs mb-4">Next Milestone</p>
              <Link to="/upcoming" className="group inline-flex items-center gap-3">
                <span className="font-display text-3xl md:text-4xl text-cream group-hover:text-copper transition-colors">{nextRace.event_name}</span>
                <ArrowRight size={20} className="text-copper group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-bone/40 text-sm mt-2">{formatDate(nextRace.event_date)} &middot; {nextRace.city ?? nextRace.location}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
