import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/journey', label: 'Journey' },
  { to: '/marathons', label: 'Marathons' },
  { to: '/upcoming', label: 'Upcoming' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/achievements', label: 'Achievements' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-ink/90 backdrop-blur-md py-3' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-editorial px-6 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-display text-2xl tracking-wider text-cream group-hover:text-copper transition-colors">
              DEEPESH
            </span>
            <span className="hidden sm:block text-xs font-heading uppercase tracking-[0.3em] text-bone/50">
              Marathon Runner
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-heading uppercase tracking-widest text-bone/70 hover:text-cream transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-copper transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="text-xs font-heading uppercase tracking-widest text-bone/30 hover:text-copper transition-colors"
              aria-label="Admin login"
            >
              Admin
            </Link>
          </div>

          <button
            className="md:hidden text-cream"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-ink flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-wider text-cream">DEEPESH</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-cream">
                <X size={24} />
              </button>
            </div>
            <motion.nav
              className="flex flex-col items-center justify-center flex-1 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navLinks.map((link) => (
                <motion.div key={link.to} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    to={link.to}
                    className="font-display text-4xl tracking-wider text-cream hover:text-copper transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Link
                  to="/admin/login"
                  className="text-sm font-heading uppercase tracking-widest text-bone/40 hover:text-copper transition-colors mt-4"
                >
                  Admin
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
