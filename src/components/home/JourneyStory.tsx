import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { JourneySection } from '@/lib/types';
import { RevealText } from '@/components/Motion';

export default function JourneyStory({ sections }: { sections: JourneySection[] }) {
  const get = (key: string) => sections.find((s) => s.section_key === key);
  const whyStarted = get('why_started');
  const beginning = get('beginning');
  const taught = get('what_running_taught');
  const roadAhead = get('road_ahead');

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const blocks = [
    { section: whyStarted, num: '01', label: 'Why I Started' },
    { section: beginning, num: '02', label: 'The Beginning' },
    { section: taught, num: '03', label: 'What Running Taught Me' },
    { section: roadAhead, num: '04', label: 'The Road Ahead' },
  ];

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
            The Story
          </motion.p>
          <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
            <RevealText>THE JOURNEY</RevealText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {blocks.map((block, i) => (
            <div key={i} className={i % 2 === 1 ? 'md:mt-32' : ''}>
              {block.section?.image_url && (
                <div className="overflow-hidden mb-8 aspect-[4/3]">
                  <motion.img
                    src={block.section.image_url}
                    alt={block.section.title}
                    className="w-full h-full object-cover"
                    style={i === 0 ? { y: imageY } : undefined}
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                  />
                </div>
              )}
              <p className="font-display text-2xl text-copper mb-2">{block.num}</p>
              <h3 className="font-heading text-2xl text-cream uppercase tracking-wider mb-4">
                {block.section?.title ?? block.label}
              </h3>
              <p className="text-bone/60 leading-relaxed text-lg">
                {block.section?.body ?? 'This story will be written soon.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
