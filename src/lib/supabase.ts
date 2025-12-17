/**
 * Supabase Client
 * Database client for PostGIS queries
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from '@/config';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Using mock data.');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(env.supabase.url, env.supabase.anonKey);
  }

  return supabaseClient;
}

/**
 * Database Types (for future Supabase integration)
 * These would be auto-generated from Supabase schema
 */
export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string;
          title: string;
          price: number;
          currency: string;
          description: string;
          address: string;
          image_url: string;
          bedrooms: number;
          bathrooms: number;
          square_feet: number;
          location: unknown; // PostGIS geography type
          property_type: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['listings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['listings']['Insert']>;
      };
    };
  };
}
