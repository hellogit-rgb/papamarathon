export type DistanceCategory = '10K' | 'Half' | 'Full' | 'Ultra';

export interface Marathon {
  id: string;
  event_name: string;
  event_date: string;
  location: string | null;
  city: string | null;
  country: string | null;
  distance_km: number;
  distance_category: DistanceCategory;
  finish_time: string | null;
  average_pace: string | null;
  position: number | null;
  bib_number: string | null;
  elevation_m: number | null;
  weather: string | null;
  race_description: string | null;
  personal_reflection: string | null;
  race_website: string | null;
  featured_image: string | null;
  gallery_images: string[] | null;
  certificate_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpcomingMarathon {
  id: string;
  event_name: string;
  event_date: string;
  location: string | null;
  city: string | null;
  country: string | null;
  distance_km: number;
  target_time: string | null;
  preparation_status: string | null;
  registration_status: string | null;
  notes: string | null;
  race_website: string | null;
  featured_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  achievement_date: string | null;
  description: string | null;
  image_url: string | null;
  related_marathon_id: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  marathon_id: string | null;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface JourneySection {
  id: string;
  section_key: string;
  title: string;
  body: string | null;
  image_url: string | null;
  updated_at: string;
}

export interface MarathonInput {
  event_name: string;
  event_date: string;
  location: string | null;
  city: string | null;
  country: string | null;
  distance_km: number;
  distance_category: DistanceCategory;
  finish_time: string | null;
  average_pace: string | null;
  position: number | null;
  bib_number: string | null;
  elevation_m: number | null;
  weather: string | null;
  race_description: string | null;
  personal_reflection: string | null;
  race_website: string | null;
  featured_image: string | null;
  gallery_images: string[];
  certificate_url: string | null;
  published: boolean;
}

export interface UpcomingInput {
  event_name: string;
  event_date: string;
  location: string | null;
  city: string | null;
  country: string | null;
  distance_km: number;
  target_time: string | null;
  preparation_status: string | null;
  registration_status: string | null;
  notes: string | null;
  race_website: string | null;
  featured_image: string | null;
  published: boolean;
}

export interface AchievementInput {
  title: string;
  achievement_date: string | null;
  description: string | null;
  image_url: string | null;
  related_marathon_id: string | null;
  category: string | null;
}
