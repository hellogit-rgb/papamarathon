import { FormEvent, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealText } from '@/components/Motion';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function TrainingForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '8d239a28-ff17-43b2-9c8c-b588e33eacbc');
    formData.append('subject', 'New marathon training inquiry');
    formData.append('from_name', 'Deepesh Marathon Runner');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setSubmissionState(data.success ? 'success' : 'error');
      if (data.success) form.reset();
    } catch {
      setSubmissionState('error');
    }
  }

  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto grid max-w-editorial gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
        <div>
          <motion.p
            className="mb-5 font-heading text-xs uppercase tracking-[0.3em] text-copper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Start Your Run
          </motion.p>
          <h2 className="font-display text-6xl leading-[0.9] text-cream md:text-8xl">
            <RevealText>DO YOU WANT TO RUN?</RevealText>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/55">
            Your first 10K, half marathon, or full marathon starts with one clear goal. Tell me what you want to achieve and let&apos;s build the training journey together.
          </p>
        </div>

        <form onSubmit={onSubmit} className="border border-stone/70 bg-ink p-6 md:p-10">
          <input type="hidden" name="botcheck" />
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-bone/50">Name</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="w-full border-b border-stone bg-transparent px-0 py-3 text-cream outline-none transition-colors placeholder:text-bone/25 focus:border-copper"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-bone/50">Phone</span>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                className="w-full border-b border-stone bg-transparent px-0 py-3 text-cream outline-none transition-colors placeholder:text-bone/25 focus:border-copper"
                placeholder="Your phone number"
              />
            </label>
          </div>

          <label className="mt-8 block">
            <span className="mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-bone/50">Mission to achieve</span>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full resize-y border-b border-stone bg-transparent px-0 py-3 text-cream outline-none transition-colors placeholder:text-bone/25 focus:border-copper"
              placeholder="Tell me about the distance, race, or finish line you have in mind"
            />
          </label>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={submissionState === 'submitting'}
              className="inline-flex items-center gap-3 border border-copper px-6 py-3 font-heading text-sm uppercase tracking-widest text-cream transition-colors hover:bg-copper hover:text-ink disabled:cursor-wait disabled:opacity-60"
            >
              {submissionState === 'submitting' ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              {submissionState === 'submitting' ? 'Sending' : 'Begin The Journey'}
            </button>
            <p role="status" className="text-sm text-bone/55">
              {submissionState === 'success' && <span className="inline-flex items-center gap-2 text-moss"><Check size={16} /> Message received. I&apos;ll be in touch.</span>}
              {submissionState === 'error' && <span className="text-ember">Something went wrong. Please try again.</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}