import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { id, action } = await request.json();
        const status = action === 'approve' ? 'approved' : 'rejected';

        const { data, error } = await supabase
            .from('registrations')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) throw error;

        if (data.length > 0) {
            // Simulate sending email
            console.log(`SIMULATED EMAIL: Sending ${action} notice to ${data[0].email}`);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
