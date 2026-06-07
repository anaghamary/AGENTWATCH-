import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string | undefined;

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export async function saveAuditNode(node: any) {
  if (!supabase) return;
  try {
    await supabase.from('audit_nodes').insert(node);
  } catch (e) {
    // ignore
  }
}

export async function saveMessage(msg: any) {
  if (!supabase) return;
  try {
    await supabase.from('messages').insert(msg);
  } catch (e) {
    // ignore
  }
}

export async function saveTrustEvent(ev: any) {
  if (!supabase) return;
  try {
    await supabase.from('trust_events').insert(ev);
  } catch (e) {
    // ignore
  }
}

export async function saveSession(session: any) {
  if (!supabase) return;
  try {
    await supabase.from('sessions').insert(session);
  } catch (e) {
    // ignore
  }
}
