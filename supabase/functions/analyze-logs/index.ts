import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const groqApiKey = Deno.env.get('GROQ_API_KEY')
    
    if (!groqApiKey) throw new Error('GROQ_API_KEY is not set.')

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { record } = await req.json()

    if (!record || !record.project_id) {
      throw new Error('No record or project_id provided.')
    }

    console.log(`Analyzing project: ${record.project_id}`)

    // Fetch history for drift analysis
    const { data: history } = await supabase
      .from('system_metrics_logs')
      .select('message, level, created_at')
      .eq('project_id', record.project_id)
      .order('created_at', { ascending: false })
      .limit(5)

    const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { 
            role: "system", 
            content: "Return ONLY JSON: {\"probability\": number, \"analysis\": \"string\", \"severity\": \"low|medium|high|critical\"}" 
          },
          { 
            role: "user", 
            content: `History: ${JSON.stringify(history)}. Current: ${record.message}` 
          }
        ],
        response_format: { type: "json_object" }
      }),
    })

    const aiData = await aiResponse.json()

    // Safety check for the "undefined reading 0" error
    if (!aiData.choices || aiData.choices.length === 0) {
      throw new Error('AI returned no choices.')
    }

    const prediction = JSON.parse(aiData.choices[0].message.content)

    // Insert into predictions table
    const { error: insertError } = await supabase
      .from('predictions')
      .insert([{
        project_id: record.project_id,
        probability: prediction.probability,
        analysis: prediction.analysis,
        severity: prediction.severity.toUpperCase()
      }])

    if (insertError) throw insertError

    return new Response(JSON.stringify({ status: 'success', prediction }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error(`Edge Function Error: ${error.message}`)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})