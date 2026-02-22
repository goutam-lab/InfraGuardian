import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    // Extracting data based on Vercel Log Drain format or custom middleware
    const { project_id, cpu, memory, latency, status, message } = body;

    const { error } = await supabase.from('system_metrics_logs').insert([{
      project_id,
      cpu_usage: cpu,
      memory_usage: memory,
      latency_ms: latency,
      status_code: status,
      message: message,
      level: status >= 500 ? 'CRITICAL' : (status >= 400 ? 'WARNING' : 'INFO')
    }]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to ingest logs' }, { status: 500 });
  }
}