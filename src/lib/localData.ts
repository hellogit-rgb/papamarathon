import type { GalleryItem, JourneySection, Marathon, UpcomingMarathon } from './types';

const images = [
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1530137073521-cb7f6c7a0c29?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85',
];

const base = (id: string, event_name: string, event_date: string, city: string, distance_km: number, distance_category: Marathon['distance_category'], featured_image: string, extra: Partial<Marathon> = {}): Marathon => ({
  id, event_name, event_date, city, distance_km, distance_category, featured_image,
  location: city, country: 'India', finish_time: null, average_pace: null, position: null,
  bib_number: null, elevation_m: null, weather: null, race_description: null,
  personal_reflection: null, race_website: null, gallery_images: [featured_image],
  certificate_url: null, published: true, created_at: event_date, updated_at: event_date, ...extra,
});

export const localMarathons: Marathon[] = [
  base('ladakh-half-2025', 'Ladakh Half Marathon', '2025-09-14', 'Ladakh', 21.1, 'Half', images[0], { race_description: 'A half marathon at altitude, where the landscape makes every breath feel earned.', personal_reflection: 'The mountains change the scale of the effort. You learn to stay present and keep moving.' }),
  base('vedanta-delhi-2025', 'Vedanta Delhi Half Marathon', '2025-10-12', 'New Delhi', 21.1, 'Half', images[1]),
  base('shahothon-delhi-2025', 'Shahothon Half Marathon', '2025-11-23', 'Delhi', 21.1, 'Half', images[2]),
  base('stadium-run-lucknow-2025', '6 Hours Stadium Run', '2025-12-28', 'Lucknow', 42, 'Ultra', images[3]),
  base('bansal-pankh-2026', 'Bansal Pankh Full Marathon', '2026-02-22', 'Bhopal', 42, 'Full', images[4]),
  base('jammu-half-2026', 'Jammu Half Marathon', '2026-03-29', 'Jammu', 21.1, 'Half', images[1]),
  base('dol-ashram-2026', 'Dol Ashram Half Marathon', '2026-06-07', 'Almora', 21, 'Half', images[2], { bib_number: '21025' }),
  base('nainital-mountain-2026', 'Nainital Mountain Marathon', '2026-08-30', 'Nainital', 21, 'Half', images[0], { finish_time: '3:56', bib_number: '2524' }),
  base('harvest-gold-2026', 'Harvest Gold Run', '2026-09-20', 'Gurugram', 10, '10K', images[4], { finish_time: '1:12', bib_number: '11411' }),
];

export const localUpcoming: UpcomingMarathon[] = [
  { id: 'sarmang-dehradun-2026', event_name: 'SARMANG Dehradun Full Marathon', event_date: '2026-10-04', location: 'Dehradun', city: 'Dehradun', country: 'India', distance_km: 42, target_time: null, preparation_status: 'In preparation', registration_status: 'Registered', notes: 'The next full-distance milestone.', race_website: null, featured_image: images[0], published: true, created_at: '2026-09-23', updated_at: '2026-09-23' },
  { id: 'adani-ahmedabad-2026', event_name: 'Adani Ahmedabad Marathon', event_date: '2026-11-29', location: 'Ahmedabad', city: 'Ahmedabad', country: 'India', distance_km: 42, target_time: null, preparation_status: 'Planned', registration_status: 'Planned', notes: 'Another 42 km chapter on the road ahead.', race_website: null, featured_image: images[3], published: true, created_at: '2026-09-23', updated_at: '2026-09-23' },
];

export const localSections: JourneySection[] = [
  { id: 'why-started', section_key: 'why_started', title: 'Why I Started', body: 'Running begins quietly. One route, one morning, one decision to keep going. This space is reserved for Deepesh’s own words about the first step.', image_url: images[1], updated_at: '2026-09-23' },
  { id: 'beginning', section_key: 'beginning', title: 'The Beginning', body: 'From city roads to high-altitude trails, the archive is built one race at a time. Every entry marks a day that asked for discipline and returned a memory.', image_url: images[0], updated_at: '2026-09-23' },
  { id: 'taught', section_key: 'what_running_taught', title: 'What Running Taught Me', body: 'Consistency is the quiet part of endurance. The finish line is visible, but the real work happens long before it comes into view.', image_url: images[4], updated_at: '2026-09-23' },
  { id: 'ahead', section_key: 'road_ahead', title: 'The Road Ahead', body: 'There is always another starting line. SARMANG Dehradun is next, followed by Ahmedabad. The journey stays open.', image_url: images[3], updated_at: '2026-09-23' },
];

export const localGallery: GalleryItem[] = localMarathons.slice(0, 5).map((marathon) => ({ id: `gallery-${marathon.id}`, marathon_id: marathon.id, image_url: marathon.featured_image!, caption: marathon.event_name, created_at: marathon.event_date }));