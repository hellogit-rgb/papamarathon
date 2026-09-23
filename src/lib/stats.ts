import type { Marathon } from './types';

export function formatDuration(iso: string | null): string {
  if (!iso) return '—';
  const match = iso.match(/(\d{2}):(\d{2}):(\d{2})/);
  if (match) return `${match[1]}:${match[2]}:${match[3]}`;
  return iso;
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateShort(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function getYear(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).getFullYear().toString();
}

export function totalDistance(marathons: Marathon[]): number {
  return marathons.reduce((sum, m) => sum + Number(m.distance_km), 0);
}

export function countByCategory(marathons: Marathon[], cat: string): number {
  return marathons.filter((m) => m.distance_category === cat).length;
}

export function longestRace(marathons: Marathon[]): number {
  return marathons.reduce((max, m) => Math.max(max, Number(m.distance_km)), 0);
}

export function yearsRunning(marathons: Marathon[]): number {
  if (marathons.length === 0) return 0;
  const years = marathons.map((m) => new Date(m.event_date).getFullYear());
  return Math.max(...years) - Math.min(...years) + 1;
}

export function averagePace(marathons: Marathon[]): string {
  const paces = marathons
    .map((m) => m.average_pace)
    .filter((p): p is string => p !== null)
    .map((p) => {
      const match = p.match(/(\d+):(\d+)/);
      if (!match) return null;
      return parseInt(match[1]) * 60 + parseInt(match[2]);
    })
    .filter((v): v is number => v !== null);
  if (paces.length === 0) return '—';
  const avg = Math.round(paces.reduce((a, b) => a + b, 0) / paces.length);
  return `${Math.floor(avg / 60)}:${String(avg % 60).padStart(2, '0')}/km`;
}

export function bestTime(marathons: Marathon[]): string {
  const times = marathons
    .map((m) => m.finish_time)
    .filter((t): t is string => t !== null)
    .map((t) => {
      const match = t.match(/(\d{2}):(\d{2}):(\d{2})/);
      if (!match) return null;
      return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]);
    })
    .filter((v): v is number => v !== null);
  if (times.length === 0) return '—';
  const best = Math.min(...times);
  const h = Math.floor(best / 3600);
  const m = Math.floor((best % 3600) / 60);
  const s = best % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function averageFinishTime(marathons: Marathon[]): string {
  const times = marathons
    .map((m) => m.finish_time)
    .filter((t): t is string => t !== null)
    .map((t) => {
      const match = t.match(/(\d{2}):(\d{2}):(\d{2})/);
      if (!match) return null;
      return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]);
    })
    .filter((v): v is number => v !== null);
  if (times.length === 0) return '—';
  const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  const h = Math.floor(avg / 3600);
  const m = Math.floor((avg % 3600) / 60);
  const s = avg % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function distanceByYear(marathons: Marathon[]): { year: string; distance: number }[] {
  const map = new Map<string, number>();
  marathons.forEach((m) => {
    const y = new Date(m.event_date).getFullYear().toString();
    map.set(y, (map.get(y) ?? 0) + Number(m.distance_km));
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([year, distance]) => ({ year, distance: Math.round(distance * 10) / 10 }));
}

export function countByYear(marathons: Marathon[]): { year: string; count: number }[] {
  const map = new Map<string, number>();
  marathons.forEach((m) => {
    const y = new Date(m.event_date).getFullYear().toString();
    map.set(y, (map.get(y) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([year, count]) => ({ year, count }));
}

export function categoryDistribution(marathons: Marathon[]): { name: string; value: number }[] {
  const cats = ['10K', 'Half', 'Full', 'Ultra'];
  return cats
    .map((c) => ({ name: c, value: marathons.filter((m) => m.distance_category === c).length }))
    .filter((d) => d.value > 0);
}

export function paceProgression(marathons: Marathon[]): { date: string; paceSeconds: number }[] {
  return marathons
    .filter((m) => m.average_pace)
    .map((m) => {
      const match = m.average_pace!.match(/(\d+):(\d+)/);
      if (!match) return null;
      return {
        date: formatDateShort(m.event_date),
        paceSeconds: parseInt(match[1]) * 60 + parseInt(match[2]),
      };
    })
    .filter((v): v is { date: string; paceSeconds: number } => v !== null);
}
