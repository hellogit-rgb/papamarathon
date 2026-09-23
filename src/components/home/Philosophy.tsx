import { motion } from 'framer-motion';
import { RevealText } from '@/components/Motion';

export default function Philosophy() {
  const principles = [
    { title: 'Consistency Over Motivation', body: 'Motivation is a feeling. Discipline is a decision. The road does not care how you feel. It only cares that you showed up.' },
    { title: 'Discipline Over Comfort', body: 'The warm bed asks you to stay. The cold road asks you to run. Every morning you choose one or the other.' },
    { title: 'Progress Over Perfection', body: 'There is no perfect race. There is only the next kilometre, the next breath, the next step forward.' },
    { title: 'The Finish Line Is Another Beginning', body: 'Every medal is a marker, not a destination. The road does not end. It only pauses.' },
  ];

  return (
    <section className="bg-ink py-24 md:py-32 relative">
      <div className="mx-auto max-w-editorial px-6">
        <div className="mb-20 text-center">
          <motion.p
            className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Philosophy
          </motion.p>
          <h2 className="font-display text-5xl md:text-7xl text-cream leading-[0.9] max-w-3xl mx-auto">
            <RevealText>EVERY KILOMETRE TEACHES SOMETHING</RevealText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              className="border-l border-stone/50 pl-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <p className="font-display text-5xl text-copper/30 mb-4">0{i + 1}</p>
              <h3 className="font-heading text-xl text-cream uppercase tracking-wider mb-3">{p.title}</h3>
              <p className="text-bone/50 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
