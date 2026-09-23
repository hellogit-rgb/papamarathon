import { motion } from 'framer-motion';
import CountUp from '@/components/CountUp';
import type { Marathon } from '@/lib/types';
import { totalDistance, yearsRunning, bestTime } from '@/lib/stats';

export default function AthleteIntro({ marathons }: { marathons: Marathon[] }) {
  const stats = [
    { label: 'Total Marathons', value: marathons.length, suffix: '' },
    { label: 'Total Distance', value: Math.round(totalDistance(marathons)), suffix: ' km' },
    { label: 'Years Running', value: yearsRunning(marathons), suffix: '' },
    { label: 'Personal Best', value: null, display: bestTime(marathons) },
  ];

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The Runner
            </motion.p>
            <motion.h2
              className="font-display text-5xl md:text-7xl text-cream leading-[0.95] mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              DEEPESH
            </motion.h2>
            <motion.p
              className="text-bone/60 text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              A marathon runner who has crossed mountains, stadiums, and city streets. From the high
              altitudes of Ladakh to the lakes of Bhopal, every race is a chapter in a journey that
              began with a single step.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-stone/40 border border-stone/40">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-ink p-8 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="font-display text-4xl md:text-5xl text-cream mb-2">
                  {stat.value !== null ? <CountUp to={stat.value} suffix={stat.suffix} /> : stat.display}
                </p>
                <p className="font-heading uppercase tracking-widest text-bone/40 text-[10px] sm:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
