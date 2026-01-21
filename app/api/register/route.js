import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const data = {
            team_name: formData.get('teamName'),
            lead_name: formData.get('leadName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            members: formData.get('members'),
            college: formData.get('college'),
            event: formData.get('event'),
            status: 'pending',
        };

        // Handle file upload to Supabase Storage
        const file = formData.get('screenshot');
        if (file) {
            const filename = `${Date.now()}_${file.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('registrations')
                .upload(filename, file);

            if (uploadError) throw new Error(`Storage Upload Error: ${uploadError.message}`);

            // Get public URL for the screenshot
            const { data: { publicUrl } } = supabase.storage
                .from('registrations')
                .getPublicUrl(filename);

            data.screenshot_url = publicUrl;
        }

        // Save to Supabase Database
        const { data: insertData, error: insertError } = await supabase
            .from('registrations')
            .insert([data])
            .select();

        if (insertError) throw new Error(`Database Insert Error: ${insertError.message}`);

        return NextResponse.json({ success: true, id: insertData[0].id });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
