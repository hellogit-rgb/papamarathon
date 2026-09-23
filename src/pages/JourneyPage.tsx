import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchJourneySections } from '@/lib/queries';
import type { JourneySection } from '@/lib/types';
import { InlineLoader, ErrorState } from '@/components/States';
import { RevealText } from '@/components/Motion';

export default function JourneyPage() {
  const [sections, setSections] = useState<JourneySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJourneySections()
      .then(setSections)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-32"><InlineLoader label="Loading the journey" /></div>;
  if (error) return <div className="pt-32"><ErrorState message={error} /></div>;

  const get = (key: string) => sections.find((s) => s.section_key === key);
  const blocks = [
    { section: get('why_started'), num: '01' },
    { section: get('beginning'), num: '02' },
    { section: get('what_running_taught'), num: '03' },
    { section: get('road_ahead'), num: '04' },
  ];

  return (
    <div className="pt-24">
      <section className="bg-ink py-20 md:py-32">
        <div className="mx-auto max-w-editorial px-6">
          <motion.p
            className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Story
          </motion.p>
          <h1 className="font-display text-7xl md:text-9xl text-cream leading-[0.9]">
            <RevealText>THE JOURNEY</RevealText>
          </h1>
        </div>
      </section>

      <section className="bg-ink pb-24 md:pb-32">
        <div className="mx-auto max-w-editorial px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {blocks.map((block, i) => (
              <div key={i} className={i % 2 === 1 ? 'md:mt-32' : ''}>
                {block.section?.image_url && (
                  <div className="overflow-hidden mb-8 aspect-[4/3]">
                    <motion.img
                      src={block.section.image_url}
                      alt={block.section.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      loading="lazy"
                    />
                  </div>
                )}
                <p className="font-display text-2xl text-copper mb-2">{block.num}</p>
                <h2 className="font-heading text-2xl text-cream uppercase tracking-wider mb-4">
                  {block.section?.title ?? 'Coming Soon'}
                </h2>
                <p className="text-bone/60 leading-relaxed text-lg">
                  {block.section?.body ?? 'This story will be written soon.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
