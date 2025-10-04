import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type News = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  category: 'minhas-palavras' | 'sobre-escrita';
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  cover_url: string | null;
  description: string;
  full_description: string | null;
  purchase_links: Record<string, string> | null;
  published_year: number | null;
  order_position: number;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  submitted_at: string;
  read: boolean;
};
