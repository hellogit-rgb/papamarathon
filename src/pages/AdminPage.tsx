import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { fetchGallery } from '@/lib/queries';
import type { GalleryItem } from '@/lib/types';

export default function AdminPage() {
  const { session, loading: authLoading, signOut } = useAuth();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session) fetchGallery().then(setGallery).catch(() => setGallery([]));
  }, [session]);

  if (authLoading) return <main className="min-h-screen bg-ink px-6 pt-40 text-center text-bone/50">Checking access...</main>;
  if (!session) return <Navigate to="/admin/login" replace />;

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setMessage('');
    try {
      const uploaded: GalleryItem[] = [];
      for (const file of files) {
        const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
        const { error } = await supabase.storage.from('marathons').upload(path, file, { upsert: false, contentType: file.type });
        if (error) throw error;
        const { data } = supabase.storage.from('marathons').getPublicUrl(path);
        const { data: row, error: insertError } = await supabase.from('gallery').insert({ image_url: data.publicUrl, caption: file.name }).select('*').single();
        if (insertError) throw insertError;
        uploaded.push(row as GalleryItem);
      }
      setGallery((current) => [...uploaded, ...current]);
      setMessage(`${uploaded.length} photograph${uploaded.length === 1 ? '' : 's'} uploaded.`);
    } catch {
      setMessage('Upload failed. Check that the marathons bucket and gallery table are configured in Supabase.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <main className="min-h-screen bg-ink px-6 pb-24 pt-32">
      <div className="mx-auto max-w-editorial">
        <div className="flex flex-col justify-between gap-6 border-b border-stone/60 pb-8 md:flex-row md:items-end">
          <div><p className="font-heading text-xs uppercase tracking-[0.3em] text-copper">Private archive</p><h1 className="mt-3 font-display text-7xl text-cream">ADMIN</h1></div>
          <div className="flex items-center gap-5"><Link to="/" className="font-heading text-xs uppercase tracking-widest text-bone/50 hover:text-copper">View site</Link><button type="button" onClick={() => void signOut()} className="font-heading text-xs uppercase tracking-widest text-bone/50 hover:text-copper">Log out</button></div>
        </div>
        <section className="mt-12 border border-stone/60 bg-charcoal p-6 md:p-10">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-copper">Gallery upload</p>
          <h2 className="mt-3 font-display text-4xl text-cream">ADD RACE PHOTOGRAPHS</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone/45">Select the photographs from your computer. They will be uploaded to the public Supabase marathons bucket and added to the gallery.</p>
          <label className="mt-7 inline-flex cursor-pointer border border-copper px-5 py-3 font-heading text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-copper hover:text-ink">{uploading ? 'Uploading...' : 'Choose photographs'}<input type="file" accept="image/*" multiple className="sr-only" onChange={upload} disabled={uploading} /></label>
          {message && <p className="mt-5 text-sm text-bone/60" role="status">{message}</p>}
        </section>
        <section className="mt-12"><div className="mb-6 flex items-end justify-between"><h2 className="font-display text-4xl text-cream">CURRENT GALLERY</h2><span className="font-heading text-xs uppercase tracking-widest text-bone/35">{gallery.length} images</span></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{gallery.map((item) => <img key={item.id} src={item.image_url} alt={item.caption ?? 'Gallery photograph'} className="aspect-square w-full object-cover" loading="lazy" />)}</div></section>
      </div>
    </main>
  );
}
