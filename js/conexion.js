import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://jaaagmjjjfhpaqzplslf.supabase.co'
const SUPABASE_KEY = 'sb_publishable_KM7xJKwITCDVvUjxEN90mg__DhXQbO7'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)