import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    
    // 1. Extract telemetry data from the request
    const { project_id, level, message, latency_ms, cpu_usage } = body;

    if (!project_id) {
      return NextResponse.json({ error: 'Missing project_id' }, { status: 400 });
    }

    // 2. Insert the log into system_metrics_logs
    const { data: logEntry, error: logError } = await supabase
      .from('system_metrics_logs')
      .insert([{ 
        project_id, 
        level: level || 'INFO', 
        message, 
        latency_ms: latency_ms || 0, 
        cpu_usage: cpu_usage || 0 
      }])
      .select()
      .single();

    if (logError) throw logError;

    // 3. Trigger the AI Agent (Edge Function) automatically
    // We use the internal network URL if possible, or the public one
    const edgeFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analyze-logs`;
    
    // Fire and forget: We don't await this so the API response stays fast
    fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({ record: logEntry })
    }).catch(err => console.error("AI Automation Trigger Failed:", err));

    return NextResponse.json({ 
      success: true, 
      message: "Telemetry ingested and AI analysis triggered",
      data: logEntry 
    });

  } catch (error: any) {
    console.error("Ingestion Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}