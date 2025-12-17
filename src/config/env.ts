/**
 * Environment Configuration
 * Type-safe environment variable access
 */
import { DEMO_MAPBOX_TOKEN } from './constants';

interface EnvConfig {
  mapbox: {
    token: string;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
  ai: {
    apiKey: string;
  };
}

function getEnvVar(key: string, fallback: string = ''): string {
  if (typeof window !== 'undefined') {
    // Client-side: only access NEXT_PUBLIC_ vars
    return (process.env[key] as string) || fallback;
  }
  return process.env[key] || fallback;
}

export const env: EnvConfig = {
  mapbox: {
    token: getEnvVar('NEXT_PUBLIC_MAPBOX_TOKEN', DEMO_MAPBOX_TOKEN),
  },
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },
  ai: {
    apiKey: getEnvVar('GEMINI_API_KEY'),
  },
};

export function isMapboxConfigured(): boolean {
  return Boolean(env.mapbox.token);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(env.supabase.url && env.supabase.anonKey);
}
