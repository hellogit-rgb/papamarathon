import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

export default function AdminLoginPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) return <Navigate to={(location.state as { from?: string } | null)?.from ?? '/admin'} replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Add your project URL and publishable key to .env, then restart the dev server.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError('Unable to sign in with those details.');
    else navigate('/admin', { replace: true });
    setSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 pt-20">
      <form onSubmit={submit} className="w-full max-w-md border border-stone/60 bg-charcoal p-8 md:p-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-copper">Private access</p>
        <h1 className="mt-4 font-display text-6xl text-cream">ADMIN LOGIN</h1>
        <p className="mt-4 text-sm leading-relaxed text-bone/45">Manage the archive, photographs, and the road ahead.</p>
        {!isSupabaseConfigured && <p className="mt-5 border border-copper/40 bg-copper/10 p-4 text-sm leading-relaxed text-copper">Admin access is paused until Supabase is connected. The public site is running with local data.</p>}
        <label className="mt-8 block font-heading text-xs uppercase tracking-widest text-bone/50">Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-stone/70 bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-copper" /></label>
        <label className="mt-5 block font-heading text-xs uppercase tracking-widest text-bone/50">Password<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-stone/70 bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-copper" /></label>
        {error && <p className="mt-4 text-sm text-ember" role="alert">{error}</p>}
        <button type="submit" disabled={submitting} className="mt-8 w-full border border-copper px-5 py-3 font-heading text-xs uppercase tracking-[0.25em] text-cream transition-colors hover:bg-copper hover:text-ink disabled:cursor-wait disabled:opacity-50">{submitting ? 'Signing in' : 'Sign in'}</button>
      </form>
    </main>
  );
}
