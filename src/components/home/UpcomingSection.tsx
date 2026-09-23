import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { UpcomingMarathon } from '@/lib/types';
import { formatDate } from '@/lib/stats';
import Countdown from '@/components/Countdown';
import { RevealText } from '@/components/Motion';

export default function UpcomingSection({ upcoming }: { upcoming: UpcomingMarathon[] }) {
  if (upcoming.length === 0) return null;
  const next = upcoming[0];

  return (
    <section className="bg-charcoal py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-editorial px-6">
        <div className="mb-20">
          <motion.p
            className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Next On The Road
          </motion.p>
          <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
            <RevealText>UPCOMING RACE</RevealText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-display text-2xl text-copper mb-2">{formatDate(next.event_date)}</p>
            <h3 className="font-heading text-3xl md:text-4xl text-cream uppercase tracking-wider mb-4">
              {next.event_name}
            </h3>
            <p className="text-bone/50 mb-2">{next.city ?? next.location}</p>
            <p className="text-bone/40 text-sm mb-8">{next.distance_km} km &middot; {next.target_time ?? 'Target TBD'}</p>
            {next.notes && <p className="text-bone/60 leading-relaxed mb-8 max-w-md">{next.notes}</p>}
            {next.race_website && (
              <a
                href={next.race_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-copper font-heading uppercase tracking-widest text-sm hover:text-ember transition-colors"
              >
                Race Website
              </a>
            )}
          </div>

          <div className="bg-ink border border-stone/50 p-10 md:p-12">
            <p className="font-heading uppercase tracking-widest text-bone/40 text-xs mb-8 text-center">
              Countdown To The Start
            </p>
            <div className="flex justify-center">
              <Countdown targetDate={next.event_date} />
            </div>
            <div className="mt-10 pt-8 border-t border-stone/40 flex justify-center">
              <Link
                to="/upcoming"
                className="inline-flex items-center gap-2 text-cream font-heading uppercase tracking-widest text-sm hover:gap-4 hover:text-copper transition-all"
              >
                All Upcoming Races <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
