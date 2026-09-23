import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { GalleryItem } from '@/lib/types';
import { RevealText } from '@/components/Motion';

export default function PhotoJourney({ gallery }: { gallery: GalleryItem[] }) {
  const items = gallery.slice(0, 6);

  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              The Visual Journey
            </motion.p>
            <h2 className="font-display text-6xl md:text-8xl text-cream leading-[0.9]">
              <RevealText>PHOTO JOURNEY</RevealText>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-copper font-heading uppercase tracking-widest text-sm hover:text-ember transition-colors"
          >
            View All Photos &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-stone/30 border border-stone/40 flex items-center justify-center">
                <p className="text-bone/20 text-xs font-heading uppercase tracking-widest">Photo Soon</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className={`overflow-hidden ${i === 0 ? 'md:row-span-2 md:col-span-2' : ''}`}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <div className={`overflow-hidden ${i === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.image_url}
                    alt={item.caption ?? 'Marathon photograph'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
