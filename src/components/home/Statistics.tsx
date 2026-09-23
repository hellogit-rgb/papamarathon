import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { Marathon } from '@/lib/types';
import {
  totalDistance,
  countByCategory,
  longestRace,
  averagePace,
  averageFinishTime,
  bestTime,
  distanceByYear,
  countByYear,
  categoryDistribution,
} from '@/lib/stats';
import CountUp from '@/components/CountUp';
import { RevealText } from '@/components/Motion';

export default function Statistics({ marathons }: { marathons: Marathon[] }) {
  const distByYear = distanceByYear(marathons);
  const countByYr = countByYear(marathons);
  const catDist = categoryDistribution(marathons);

  const stats = [
    { label: 'Total Races', value: marathons.length, suffix: '' },
    { label: 'Total Kilometres', value: Math.round(totalDistance(marathons)), suffix: ' km' },
    { label: '10K Races', value: countByCategory(marathons, '10K'), suffix: '' },
    { label: 'Half Marathons', value: countByCategory(marathons, 'Half'), suffix: '' },
    { label: 'Full Marathons', value: countByCategory(marathons, 'Full'), suffix: '' },
    { label: 'Longest Race', value: Math.round(longestRace(marathons)), suffix: ' km' },
    { label: 'Average Pace', value: null, display: averagePace(marathons) },
    { label: 'Best Time', value: null, display: bestTime(marathons) },
  ];

  const ease = [0.16, 1, 0.3, 1] as const;

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
            By The Numbers
          </motion.p>
          <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
            <RevealText>THE DISTANCE</RevealText>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone/40 border border-stone/40 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-ink p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <p className="font-display text-3xl md:text-4xl text-cream mb-1">
                {stat.value !== null ? <CountUp to={stat.value} suffix={stat.suffix} /> : stat.display}
              </p>
              <p className="font-heading uppercase tracking-widest text-bone/40 text-[10px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-charcoal p-8 border border-stone/40"
          >
            <p className="font-heading uppercase tracking-widest text-copper text-xs mb-6">
              Distance By Year
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distByYear}>
                  <XAxis
                    dataKey="year"
                    stroke="#e8e2d6"
                    tick={{ fill: '#e8e2d6', fontSize: 12, fontFamily: 'Oswald' }}
                    axisLine={{ stroke: '#2a2724' }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#1a1815' }}
                    contentStyle={{
                      background: '#1a1815',
                      border: '1px solid #b87333',
                      fontFamily: 'DM Sans',
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#f5f1ea' }}
                  />
                  <Bar dataKey="distance" fill="#b87333" radius={[2, 2, 0, 0]} name="km" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="bg-charcoal p-8 border border-stone/40"
          >
            <p className="font-heading uppercase tracking-widest text-copper text-xs mb-6">
              Races By Year
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countByYr}>
                  <XAxis
                    dataKey="year"
                    stroke="#e8e2d6"
                    tick={{ fill: '#e8e2d6', fontSize: 12, fontFamily: 'Oswald' }}
                    axisLine={{ stroke: '#2a2724' }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#1a1815' }}
                    contentStyle={{
                      background: '#1a1815',
                      border: '1px solid #b87333',
                      fontFamily: 'DM Sans',
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#f5f1ea' }}
                  />
                  <Bar dataKey="count" fill="#6b7a4f" radius={[2, 2, 0, 0]} name="races" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {catDist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="bg-charcoal p-8 border border-stone/40"
            >
              <p className="font-heading uppercase tracking-widest text-copper text-xs mb-6">
                Race Categories
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={catDist} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#e8e2d6"
                      tick={{ fill: '#e8e2d6', fontSize: 12, fontFamily: 'Oswald' }}
                      axisLine={{ stroke: '#2a2724' }}
                      tickLine={false}
                      width={60}
                    />
                    <Tooltip
                      cursor={{ fill: '#1a1815' }}
                      contentStyle={{
                        background: '#1a1815',
                        border: '1px solid #b87333',
                        fontFamily: 'DM Sans',
                        fontSize: 12,
                      }}
                      labelStyle={{ color: '#f5f1ea' }}
                    />
                    <Bar dataKey="value" fill="#d4793a" radius={[0, 2, 2, 0]} name="races" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="bg-charcoal p-8 border border-stone/40 flex flex-col justify-center"
          >
            <p className="font-heading uppercase tracking-widest text-copper text-xs mb-6">
              Average Finish Time
            </p>
            <p className="font-display text-6xl text-cream mb-2">{averageFinishTime(marathons)}</p>
            <p className="text-bone/40 text-sm">across all completed races</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
