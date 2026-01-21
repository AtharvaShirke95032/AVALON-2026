-- 1. Create the registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    team_name TEXT NOT NULL,
    lead_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    members TEXT NOT NULL,
    college TEXT NOT NULL,
    event TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    screenshot_url TEXT,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow everyone to submit registrations (Insert)
CREATE POLICY "Enable insert for all users" ON public.registrations
    FOR INSERT WITH CHECK (true);

-- Allow admins (who have the anon key for now, or authenticated later) to see and update all
-- For now, for simplicity in this demo, we can allow all reads if we want, 
-- but better to restrict. 
CREATE POLICY "Enable select for all users" ON public.registrations
    FOR SELECT USING (true);

CREATE POLICY "Enable update for all users" ON public.registrations
    FOR UPDATE USING (true);


-- 4. Set up Storage for screenshots
-- Create a bucket named 'registrations' in the Supabase Dashboard manually, 
-- or use this if you have the permissions:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('registrations', 'registrations', true);

-- Storage policies:
-- Allow public uploads
CREATE POLICY "Public Uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'registrations');

-- Allow public reads
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'registrations');
