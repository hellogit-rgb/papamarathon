import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Marathon } from '@/lib/types';
import { formatDate, formatDuration } from '@/lib/stats';
import { RevealText } from '@/components/Motion';

export default function FeaturedMarathon({ marathons }: { marathons: Marathon[] }) {
  if (marathons.length === 0) return null;
  const featured = [...marathons].sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())[0];

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6">
        <div className="mb-20">
          <motion.p
            className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Most Recent Race
          </motion.p>
          <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
            <RevealText>FEATURED RACE</RevealText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="overflow-hidden aspect-[4/3]"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={featured.featured_image ?? ''}
              alt={featured.event_name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div>
            <p className="font-display text-2xl text-copper mb-2">{formatDate(featured.event_date)}</p>
            <h3 className="font-heading text-3xl md:text-4xl text-cream uppercase tracking-wider mb-4">
              {featured.event_name}
            </h3>
            <p className="text-bone/50 mb-8">{featured.city ?? featured.location}</p>

            <div className="grid grid-cols-3 gap-px bg-stone/40 border border-stone/40 mb-8">
              <div className="bg-ink p-4">
                <p className="font-display text-3xl text-cream">{featured.distance_km}</p>
                <p className="font-heading uppercase tracking-widest text-bone/40 text-[10px]">km</p>
              </div>
              <div className="bg-ink p-4">
                <p className="font-display text-3xl text-cream">{formatDuration(featured.finish_time)}</p>
                <p className="font-heading uppercase tracking-widest text-bone/40 text-[10px]">finish</p>
              </div>
              <div className="bg-ink p-4">
                <p className="font-display text-3xl text-cream">{featured.distance_category}</p>
                <p className="font-heading uppercase tracking-widest text-bone/40 text-[10px]">category</p>
              </div>
            </div>

            {featured.personal_reflection && (
              <p className="text-bone/60 leading-relaxed mb-8 italic">&ldquo;{featured.personal_reflection}&rdquo;</p>
            )}

            <Link
              to={`/marathons/${featured.id}`}
              className="inline-flex items-center gap-2 text-copper font-heading uppercase tracking-widest text-sm hover:gap-4 transition-all"
            >
              Read The Race Report <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
