import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Achievement } from '@/lib/types';
import { formatDate } from '@/lib/stats';
import { RevealText } from '@/components/Motion';

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
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
            Milestones
          </motion.p>
          <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
            <RevealText>ACHIEVEMENTS</RevealText>
          </h2>
        </div>

        {achievements.length === 0 ? (
          <div className="border-l border-stone/50 pl-8">
            <p className="font-heading uppercase tracking-wider text-bone/40 text-lg">
              Achievements will be added as the journey unfolds.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-stone/50" />
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                className="relative pl-12 pb-16 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="absolute left-0 top-2 w-3 h-3 bg-copper rounded-full ring-4 ring-ink" />
                <p className="font-display text-2xl text-copper mb-1">{formatDate(a.achievement_date)}</p>
                <h3 className="font-heading text-xl text-cream uppercase tracking-wider mb-2">{a.title}</h3>
                {a.description && <p className="text-bone/50 leading-relaxed max-w-2xl">{a.description}</p>}
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-cream font-heading uppercase tracking-widest text-sm hover:gap-4 hover:text-copper transition-all"
          >
            All Achievements <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
