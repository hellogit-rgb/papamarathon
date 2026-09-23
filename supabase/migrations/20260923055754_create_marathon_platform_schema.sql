/*
# Create marathon platform schema for Deepesh's runner website

1. New Tables
- `marathons`: completed race records (event, date, location, distance, finish time, pace, position, bib, elevation, weather, description, reflection, website, featured image, gallery images, certificate, published flag).
- `upcoming_marathons`: scheduled future races (event, date, location, distance, target time, preparation/registration status, notes, website, featured image, published flag).
- `achievements`: medals and milestones (title, date, description, image, related marathon, category).
- `gallery`: photographs assigned to marathons (marathon_id, image_url, caption).
- `journey_sections`: editable storytelling blocks keyed by section (why_started, beginning, what_running_taught, road_ahead, philosophy, future_goals) with title, body, image.

2. Security
- RLS enabled on every table.
- Public (anon, authenticated) can SELECT only rows where published = true.
- Authenticated administrators can INSERT/UPDATE/DELETE all rows (admin CMS).
- journey_sections are publicly readable (published storytelling content), editable only by authenticated admins.

3. Storage
- Creates a public bucket `marathons` for photographs.
- Public read; authenticated write.

4. Notes
- All tables use UUID primary keys and timestamps.
- Indexes added on event_date and published for fast public queries.
*/

CREATE TABLE IF NOT EXISTS marathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  event_date date NOT NULL,
  location text,
  city text,
  country text,
  distance_km numeric NOT NULL,
  distance_category text NOT NULL DEFAULT 'Half',
  finish_time interval,
  average_pace text,
  position integer,
  bib_number text,
  elevation_m integer,
  weather text,
  race_description text,
  personal_reflection text,
  race_website text,
  featured_image text,
  gallery_images text[] DEFAULT '{}',
  certificate_url text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE marathons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_marathons" ON marathons;
CREATE POLICY "public_read_published_marathons" ON marathons FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_marathons" ON marathons;
CREATE POLICY "admin_insert_marathons" ON marathons FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_marathons" ON marathons;
CREATE POLICY "admin_update_marathons" ON marathons FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_marathons" ON marathons;
CREATE POLICY "admin_delete_marathons" ON marathons FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_marathons_event_date ON marathons (event_date);
CREATE INDEX IF NOT EXISTS idx_marathons_published ON marathons (published);

CREATE TABLE IF NOT EXISTS upcoming_marathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  event_date date NOT NULL,
  location text,
  city text,
  country text,
  distance_km numeric NOT NULL,
  target_time text,
  preparation_status text DEFAULT 'In Training',
  registration_status text DEFAULT 'Registered',
  notes text,
  race_website text,
  featured_image text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE upcoming_marathons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_upcoming" ON upcoming_marathons;
CREATE POLICY "public_read_published_upcoming" ON upcoming_marathons FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "admin_insert_upcoming" ON upcoming_marathons;
CREATE POLICY "admin_insert_upcoming" ON upcoming_marathons FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_upcoming" ON upcoming_marathons;
CREATE POLICY "admin_update_upcoming" ON upcoming_marathons FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_upcoming" ON upcoming_marathons;
CREATE POLICY "admin_delete_upcoming" ON upcoming_marathons FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_upcoming_event_date ON upcoming_marathons (event_date);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  achievement_date date,
  description text,
  image_url text,
  related_marathon_id uuid REFERENCES marathons(id) ON DELETE SET NULL,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_achievements" ON achievements;
CREATE POLICY "public_read_achievements" ON achievements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_achievements" ON achievements;
CREATE POLICY "admin_insert_achievements" ON achievements FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_achievements" ON achievements;
CREATE POLICY "admin_update_achievements" ON achievements FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_achievements" ON achievements;
CREATE POLICY "admin_delete_achievements" ON achievements FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marathon_id uuid REFERENCES marathons(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gallery" ON gallery;
CREATE POLICY "public_read_gallery" ON gallery FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gallery" ON gallery;
CREATE POLICY "admin_insert_gallery" ON gallery FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_gallery" ON gallery;
CREATE POLICY "admin_update_gallery" ON gallery FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_gallery" ON gallery;
CREATE POLICY "admin_delete_gallery" ON gallery FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS journey_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL,
  body text,
  image_url text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE journey_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_journey" ON journey_sections;
CREATE POLICY "public_read_journey" ON journey_sections FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_journey" ON journey_sections;
CREATE POLICY "admin_insert_journey" ON journey_sections FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_journey" ON journey_sections;
CREATE POLICY "admin_update_journey" ON journey_sections FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_journey" ON journey_sections;
CREATE POLICY "admin_delete_journey" ON journey_sections FOR DELETE
  TO authenticated USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('marathons', 'marathons', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_marathons_bucket" ON storage.objects;
CREATE POLICY "public_read_marathons_bucket" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'marathons');

DROP POLICY IF EXISTS "admin_write_marathons_bucket" ON storage.objects;
CREATE POLICY "admin_write_marathons_bucket" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'marathons');

DROP POLICY IF EXISTS "admin_update_marathons_bucket" ON storage.objects;
CREATE POLICY "admin_update_marathons_bucket" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'marathons') WITH CHECK (bucket_id = 'marathons');

DROP POLICY IF EXISTS "admin_delete_marathons_bucket" ON storage.objects;
CREATE POLICY "admin_delete_marathons_bucket" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'marathons');
