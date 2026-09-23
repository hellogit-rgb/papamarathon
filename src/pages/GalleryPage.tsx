import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { fetchGallery } from '@/lib/queries';
import type { GalleryItem } from '@/lib/types';
import { ErrorState, InlineLoader, EmptyState } from '@/components/States';
import { RevealText } from '@/components/Motion';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery()
      .then(setItems)
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load the gallery.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-32"><InlineLoader label="Loading the photographs" /></div>;
  if (error) return <div className="pt-32"><ErrorState message={error} /></div>;

  return (
    <main className="bg-ink pt-24">
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-editorial">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-copper">The visual archive</p>
          <h1 className="mt-4 font-display text-7xl leading-[0.86] text-cream md:text-9xl"><RevealText>PHOTO JOURNEY</RevealText></h1>
          <p className="mt-8 max-w-md text-bone/50">Race days, training miles, and the moments that stay after the finish line.</p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-editorial">
          {items.length === 0 ? (
            <EmptyState title="The archive is waiting" message="Photographs will appear here after they are uploaded from the admin gallery." />
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {items.map((item, index) => (
                <motion.button
                  type="button"
                  key={item.id}
                  className="group mb-5 block w-full break-inside-avoid text-left"
                  onClick={() => setSelected(item)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.04 }}
                  aria-label={`Open ${item.caption ?? 'marathon photograph'}`}
                >
                  <div className="overflow-hidden bg-charcoal">
                    <img src={item.image_url} alt={item.caption ?? 'Marathon photograph'} className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                  {item.caption && <p className="mt-3 font-heading text-xs uppercase tracking-[0.2em] text-bone/45">{item.caption}</p>}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label="Photo viewer">
            <button type="button" onClick={() => setSelected(null)} className="absolute right-5 top-5 text-cream/70 transition-colors hover:text-copper" aria-label="Close photo viewer"><X size={28} /></button>
            <motion.img src={selected.image_url} alt={selected.caption ?? 'Marathon photograph'} className="max-h-[88vh] max-w-full object-contain" initial={{ scale: 0.96 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
