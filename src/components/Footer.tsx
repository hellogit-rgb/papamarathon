import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/journey', label: 'Journey' },
  { to: '/marathons', label: 'Marathons' },
  { to: '/upcoming', label: 'Upcoming' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/achievements', label: 'Achievements' },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-stone/50 pt-20 pb-10">
      <div className="mx-auto max-w-editorial px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="font-display text-5xl tracking-wider text-cream">DEEPESH</h2>
            <p className="font-heading uppercase tracking-[0.3em] text-bone/40 text-xs mt-2">Marathon Runner</p>
            <p className="text-bone/50 mt-6 text-sm leading-relaxed max-w-xs">
              One step at a time. Every kilometre is a teacher. Every finish line is another beginning.
            </p>
          </div>

          <div>
            <p className="font-heading uppercase tracking-widest text-xs text-copper mb-4">Navigate</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-bone/60 hover:text-cream transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading uppercase tracking-widest text-xs text-copper mb-4">The Road</p>
            <p className="text-bone/50 text-sm leading-relaxed">
              From the Himalayas to the plains. From 10K to 42.2K. The journey continues.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-bone/30 text-xs">
            &copy; {new Date().getFullYear()} Deepesh. All rights reserved.
          </p>
          <p className="text-bone/30 text-xs font-heading uppercase tracking-widest">
            Built with discipline
          </p>
        </div>
      </div>
    </footer>
  );
}
