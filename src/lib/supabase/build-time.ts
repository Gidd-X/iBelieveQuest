import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase.type'

/**
 * Creates a Supabase client for use during build time (e.g., generateStaticParams)
 * This client does not use cookies and is suitable for public data access during SSG
 * @returns Configured Supabase client for build-time operations
 */
export function createBuildTimeClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    )
  }
  
  return createClient<Database>(supabaseUrl, supabaseKey)
}
