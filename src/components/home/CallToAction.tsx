import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealText } from '@/components/Motion';

export default function CallToAction() {
  return (
    <section className="bg-ink py-32 md:py-40 relative overflow-hidden">
      <div className="mx-auto max-w-editorial px-6 text-center">
        <motion.p
          className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Road Continues
        </motion.p>
        <h2 className="font-display text-6xl md:text-9xl text-cream leading-[0.9] mb-10">
          <RevealText>ONE STEP AT A TIME.</RevealText>
        </h2>
        <p className="text-bone/50 text-lg max-w-xl mx-auto mb-12">
          The journey is far from over. There are more roads, more mountains, more mornings ahead.
        </p>
        <Link
          to="/marathons"
          className="inline-block border border-copper text-cream px-10 py-4 font-heading uppercase tracking-widest text-sm hover:bg-copper hover:text-ink transition-all duration-300"
        >
          Explore The Marathons
        </Link>
      </div>
    </section>
  );
}
