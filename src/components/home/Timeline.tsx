import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Marathon } from '@/lib/types';
import { formatDateShort, getYear } from '@/lib/stats';
import { RevealText } from '@/components/Motion';

export default function Timeline({ marathons }: { marathons: Marathon[] }) {
  const sorted = [...marathons].sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

  return (
    <section className="bg-charcoal py-24 md:py-32 relative">
      <div className="mx-auto max-w-editorial px-6">
        <div className="mb-20">
          <motion.p
            className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Races
          </motion.p>
          <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
            <RevealText>MARATHON TIMELINE</RevealText>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone md:-translate-x-1/2" />

          {sorted.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={m.id}
                className={`relative flex items-center mb-16 md:mb-24 ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-copper rounded-full md:-translate-x-1/2 ring-4 ring-charcoal z-10" />

                <Link
                  to={`/marathons/${m.id}`}
                  className={`ml-12 md:ml-0 group block w-full ${
                    isLeft ? 'md:w-[44%]' : 'md:w-[44%]'
                  }`}
                >
                  <div className="bg-ink border border-stone/50 overflow-hidden transition-all duration-300 group-hover:border-copper/50">
                    {m.featured_image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={m.featured_image}
                          alt={m.event_name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-display text-3xl text-copper mb-1">{getYear(m.event_date)}</p>
                      <p className="font-heading uppercase tracking-wider text-cream text-lg mb-1">
                        {m.event_name}
                      </p>
                      <p className="text-bone/40 text-sm mb-3">
                        {m.city ?? m.location} &middot; {formatDateShort(m.event_date)}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-heading uppercase tracking-widest text-bone/50">
                          {m.distance_km} km
                        </span>
                        <span className="text-stone">|</span>
                        <span className="font-heading uppercase tracking-widest text-bone/50">
                          {m.distance_category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
