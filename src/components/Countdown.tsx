import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeLeft>(() => calculate(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calculate(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <div className="flex gap-6 sm:gap-10">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="font-display text-4xl sm:text-6xl text-cream tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="font-heading uppercase tracking-widest text-bone/40 text-[10px] sm:text-xs mt-1">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
