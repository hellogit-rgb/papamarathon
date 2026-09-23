import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-px w-24 bg-copper"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: 'left' }}
        />
        <p className="font-heading uppercase tracking-[0.3em] text-bone/40 text-xs">Loading</p>
      </div>
    </div>
  );
}

export function InlineLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="h-px w-16 bg-copper"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: 'left' }}
        />
        <p className="font-heading uppercase tracking-widest text-bone/30 text-xs">{label}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <p className="font-display text-3xl text-copper mb-2">Wrong Turn</p>
      <p className="text-bone/50 text-sm max-w-md">{message}</p>
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="h-px w-12 bg-stone mb-6" />
      <p className="font-display text-2xl text-bone/60 mb-2">{title}</p>
      <p className="text-bone/30 text-sm max-w-md">{message}</p>
    </div>
  );
}
