import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src="https://images.pexels.com/photos/35388271/pexels-photo-35388271.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="A runner on a mountain road at altitude"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-12 text-center"
        style={{ y: textY, opacity }}
      >
        <motion.p
          className="font-heading uppercase tracking-[0.4em] text-bone/60 text-[10px] sm:text-xs mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          Deepesh &mdash; Marathon Runner
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[3.2rem] sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-[0.9] tracking-tighter-2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            RUNNING IS NOT
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[3.2rem] sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-[0.9] tracking-tighter-2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
          >
            ABOUT THE FINISH LINE.
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.p
            className="font-display text-3xl sm:text-5xl md:text-6xl text-copper leading-[0.95] tracking-tighter-2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.55 }}
          >
            IT&apos;S ABOUT EVERY STEP
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="font-display text-3xl sm:text-5xl md:text-6xl text-copper leading-tight tracking-tighter-2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.65 }}
          >
            THAT GOT YOU THERE.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <ChevronDown size={20} className="text-cream/50 scroll-hint" />
      </motion.div>
    </section>
  );
}
