import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMarathons } from '@/lib/queries';
import type { Marathon, DistanceCategory } from '@/lib/types';
import { formatDateShort, getYear } from '@/lib/stats';
import { InlineLoader, ErrorState, EmptyState } from '@/components/States';
import { RevealText } from '@/components/Motion';
import { Search } from 'lucide-react';

export default function MarathonsPage() {
  const [marathons, setMarathons] = useState<Marathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [locFilter, setLocFilter] = useState('all');

  useEffect(() => {
    fetchMarathons()
      .then(setMarathons)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const years = useMemo(() => [...new Set(marathons.map((m) => getYear(m.event_date)))].sort(), [marathons]);
  const locations = useMemo(() => [...new Set(marathons.map((m) => m.city ?? m.location ?? '').filter(Boolean))].sort(), [marathons]);
  const categories: DistanceCategory[] = ['10K', 'Half', 'Full', 'Ultra'];

  const filtered = marathons.filter((m) => {
    if (search && !m.event_name.toLowerCase().includes(search.toLowerCase()) && !(m.city ?? '').toLowerCase().includes(search.toLowerCase())) return false;
    if (yearFilter !== 'all' && getYear(m.event_date) !== yearFilter) return false;
    if (catFilter !== 'all' && m.distance_category !== catFilter) return false;
    if (locFilter !== 'all' && (m.city ?? m.location) !== locFilter) return false;
    return true;
  });

  if (loading) return <div className="pt-32"><InlineLoader label="Loading marathons" /></div>;
  if (error) return <div className="pt-32"><ErrorState message={error} /></div>;

  return (
    <div className="pt-24">
      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-editorial px-6">
          <motion.p
            className="font-heading uppercase tracking-[0.3em] text-copper text-xs mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Archive
          </motion.p>
          <h1 className="font-display text-7xl md:text-9xl text-cream leading-[0.9]">
            <RevealText>MARATHONS</RevealText>
          </h1>
        </div>
      </section>

      <section className="bg-ink pb-24 md:pb-32">
        <div className="mx-auto max-w-editorial px-6">
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-bone/30" />
              <input
                type="text"
                placeholder="Search by event or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-charcoal border border-stone/50 pl-11 pr-4 py-3 text-cream text-sm placeholder:text-bone/30 focus:outline-none focus:border-copper transition-colors"
              />
            </div>
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="bg-charcoal border border-stone/50 px-4 py-3 text-cream text-sm focus:outline-none focus:border-copper transition-colors">
              <option value="all">All Years</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="bg-charcoal border border-stone/50 px-4 py-3 text-cream text-sm focus:outline-none focus:border-copper transition-colors">
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={locFilter} onChange={(e) => setLocFilter(e.target.value)} className="bg-charcoal border border-stone/50 px-4 py-3 text-cream text-sm focus:outline-none focus:border-copper transition-colors">
              <option value="all">All Locations</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No Marathons Found" message="Try adjusting your filters to see more races." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}>
                  <Link to={`/marathons/${m.id}`} className="group block bg-charcoal border border-stone/50 overflow-hidden hover:border-copper/50 transition-all duration-300">
                    {m.featured_image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={m.featured_image} alt={m.event_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-display text-xl text-copper mb-1">{getYear(m.event_date)}</p>
                      <p className="font-heading uppercase tracking-wider text-cream text-lg mb-1">{m.event_name}</p>
                      <p className="text-bone/40 text-sm mb-4">{m.city ?? m.location} &middot; {formatDateShort(m.event_date)}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-heading uppercase tracking-widest text-bone/50">{m.distance_km} km</span>
                        <span className="text-stone">|</span>
                        <span className="font-heading uppercase tracking-widest text-bone/50">{m.distance_category}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
