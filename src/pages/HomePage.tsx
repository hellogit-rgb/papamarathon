import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import AthleteIntro from '@/components/home/AthleteIntro';
import JourneyStory from '@/components/home/JourneyStory';
import Timeline from '@/components/home/Timeline';
import Statistics from '@/components/home/Statistics';
import FeaturedMarathon from '@/components/home/FeaturedMarathon';
import UpcomingSection from '@/components/home/UpcomingSection';
import TrainingForm from '@/components/home/TrainingForm';
import Philosophy from '@/components/home/Philosophy';
import PhotoJourney from '@/components/home/PhotoJourney';
import Achievements from '@/components/home/Achievements';
import CallToAction from '@/components/home/CallToAction';
import { fetchMarathons, fetchUpcoming, fetchAchievements, fetchGallery, fetchJourneySections } from '@/lib/queries';
import type { Marathon, UpcomingMarathon, Achievement, GalleryItem, JourneySection } from '@/lib/types';
import { InlineLoader, ErrorState } from '@/components/States';

export default function HomePage() {
  const [data, setData] = useState<{
    marathons: Marathon[];
    upcoming: UpcomingMarathon[];
    achievements: Achievement[];
    gallery: GalleryItem[];
    sections: JourneySection[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchMarathons(), fetchUpcoming(), fetchAchievements(), fetchGallery(), fetchJourneySections()])
      .then(([marathons, upcoming, achievements, gallery, sections]) => {
        setData({ marathons, upcoming, achievements, gallery, sections });
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!data) return <InlineLoader label="Preparing the journey" />;

  return (
    <>
      <Hero />
      <AthleteIntro marathons={data.marathons} />
      <JourneyStory sections={data.sections} />
      <Timeline marathons={data.marathons} />
      <Statistics marathons={data.marathons} />
      <UpcomingSection upcoming={data.upcoming} />
      <TrainingForm />
      <FeaturedMarathon marathons={data.marathons} />
      <Philosophy />
      <PhotoJourney gallery={data.gallery} />
      <Achievements achievements={data.achievements} />
      <CallToAction />
    </>
  );
}
