import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import HomePage from '@/pages/HomePage';
import JourneyPage from '@/pages/JourneyPage';
import MarathonsPage from '@/pages/MarathonsPage';
import MarathonDetailPage from '@/pages/MarathonDetailPage';
import GalleryPage from '@/pages/GalleryPage';
import UpcomingPage from '@/pages/UpcomingPage';
import AchievementsPage from '@/pages/AchievementsPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminPage from '@/pages/AdminPage';
import { AuthProvider } from '@/lib/auth';

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-ink px-6 pt-40 text-center">
      <p className="font-heading text-xs uppercase tracking-[0.35em] text-copper">Wrong turn</p>
      <h1 className="mt-5 font-display text-7xl text-cream md:text-9xl">404</h1>
      <p className="mx-auto mt-5 max-w-md text-bone/50">The road you are looking for is not on this route.</p>
      <a href="/" className="mt-10 inline-flex border border-copper px-6 py-3 font-heading text-xs uppercase tracking-[0.25em] text-cream transition-colors hover:bg-copper hover:text-ink">Back to the journey</a>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollProgress />
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/marathons" element={<MarathonsPage />} />
        <Route path="/marathons/:id" element={<MarathonDetailPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
