import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY sao obrigatorios. Rode o script com node --env-file=.env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const TEAM_CODES = ["FER", "MCL", "MER", "RBR", "AST", "ALP", "WIL", "RBU", "HAA", "SAU"];

// Helper para pegar N times aleatorios
function getRandomTeams(n) {
    const shuffled = [...TEAM_CODES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

async function createFakeUsers() {
  const args = process.argv.slice(2);
  const n = args.length > 0 ? parseInt(args[0], 10) : 5;
  
  if (isNaN(n) || n <= 0) {
      console.error("Por favor, forneça um número válido N de usuários.");
      process.exit(1);
  }

  console.log(`\nIniciando simulacao completa para criar ${n} usuarios fakes...`)
  console.log(`O script vai: (1) Criar o Auth (2) Preencher a Wishlist do Silly Season (3) Tentar alocar o contrato na Garagem\n`);
  
  for (let i = 1; i <= n; i++) {
    const uid = Math.random().toString(36).substring(2, 6).toUpperCase();
    const email = `bot_${uid}_${i}@fantasy.com`;
    const password = 'password123';
    const username = `Bot Pilot ${uid}`;

    // 1. Create Auth User
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username }
    })
    
    if (authError) {
        console.error(`[X] Erro ao criar ${email}:`, authError.message)
        continue;
    } 

    console.log(`[${i}/${n}] User Auth criado: ${email} (ID: ${authData.user.id})`);
    
    // Pequeno delay para garantir que a trigger do banco 'handle_new_user' complete a criacao do profile
    await new Promise(resolve => setTimeout(resolve, 600));

    // 2. Simulando as opcoes do Silly Season
    const preferredTeams = getRandomTeams(3);
    console.log(`    -> Opções de contrato (Silly Season): ${preferredTeams.join(', ')}`);

    const { error: profileError } = await supabase
        .from('profiles')
        .update({ preferred_teams: preferredTeams })
        .eq('id', authData.user.id);
        
    if (profileError) {
        console.error(`    -> Erro ao salvar wishlist no profile:`, profileError.message);
    }

    // 3. Chama a RPC para assinar o contrato (assign_preferred_garage) testando a alocacao
    const { data: rpcData, error: rpcError } = await supabase.rpc("assign_preferred_garage", {
        p_user_id: authData.user.id,
        p_preferred_teams: preferredTeams
    });

    if (rpcError) {
        console.error(`    -> [ERRO RPC] Falha ao alocar garagem:`, rpcError.message);
    } else {
        console.log(`    -> Contrato Assinado! Alocado com sucesso.`);
    }
    console.log("---------------------------------------------------");
  }
  
  console.log('\nProcesso finalizado com sucesso!');
}

createFakeUsers()
