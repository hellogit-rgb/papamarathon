import { supabase } from './supabase';
import { isSupabaseConfigured } from './supabase';
import type { Marathon, UpcomingMarathon, Achievement, GalleryItem, JourneySection } from './types';
import { localGallery, localMarathons, localSections, localUpcoming } from './localData';

export async function fetchMarathons(): Promise<Marathon[]> {
  if (!isSupabaseConfigured) return localMarathons;
  const { data, error } = await supabase
    .from('marathons')
    .select('*')
    .eq('published', true)
    .order('event_date', { ascending: true });
  if (error) return localMarathons;
  return (data ?? []) as Marathon[];
}

export async function fetchAllMarathons(): Promise<Marathon[]> {
  if (!isSupabaseConfigured) return localMarathons;
  const { data, error } = await supabase
    .from('marathons')
    .select('*')
    .order('event_date', { ascending: false });
  if (error) return localMarathons;
  return (data ?? []) as Marathon[];
}

export async function fetchMarathon(id: string): Promise<Marathon | null> {
  if (!isSupabaseConfigured) return localMarathons.find((marathon) => marathon.id === id) ?? null;
  const { data, error } = await supabase
    .from('marathons')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) return localMarathons.find((marathon) => marathon.id === id) ?? null;
  return data as Marathon | null;
}

export async function fetchUpcoming(): Promise<UpcomingMarathon[]> {
  if (!isSupabaseConfigured) return localUpcoming;
  const { data, error } = await supabase
    .from('upcoming_marathons')
    .select('*')
    .eq('published', true)
    .order('event_date', { ascending: true });
  if (error) return localUpcoming;
  return (data ?? []) as UpcomingMarathon[];
}

export async function fetchAllUpcoming(): Promise<UpcomingMarathon[]> {
  if (!isSupabaseConfigured) return localUpcoming;
  const { data, error } = await supabase
    .from('upcoming_marathons')
    .select('*')
    .order('event_date', { ascending: false });
  if (error) return localUpcoming;
  return (data ?? []) as UpcomingMarathon[];
}

export async function fetchAchievements(): Promise<Achievement[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('achievement_date', { ascending: false });
  if (error) return [];
  return (data ?? []) as Achievement[];
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return localGallery;
  const { data, error } = await supabase
    .from('gallery')
    .select('*, marathons(event_name)')
    .order('created_at', { ascending: false });
  if (error) return localGallery;
  return (data ?? []) as GalleryItem[];
}

export async function fetchJourneySections(): Promise<JourneySection[]> {
  if (!isSupabaseConfigured) return localSections;
  const { data, error } = await supabase.from('journey_sections').select('*');
  if (error) return localSections;
  return (data ?? []) as JourneySection[];
}

export async function fetchJourneySection(key: string): Promise<JourneySection | null> {
  if (!isSupabaseConfigured) return localSections.find((section) => section.section_key === key) ?? null;
  const { data, error } = await supabase
    .from('journey_sections')
    .select('*')
    .eq('section_key', key)
    .maybeSingle();
  if (error) return localSections.find((section) => section.section_key === key) ?? null;
  return data as JourneySection | null;
}
