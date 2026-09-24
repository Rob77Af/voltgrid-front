const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing RPC...");
    const { data, error } = await supabase.rpc('sign_initial_contract', { p_team_id: "00000000-0000-0000-0000-000000000000" });
    console.log("Data:", data);
    console.log("Error:", error);
}

test();
