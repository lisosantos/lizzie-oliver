/*
  # Create Initial Schema for Lizzie Oliver Website

  1. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text, not null) - Title of the news article
      - `slug` (text, unique, not null) - URL-friendly slug
      - `summary` (text) - Short summary for listing pages
      - `content` (text, not null) - Full content of the article
      - `image_url` (text) - URL for the cover image
      - `published_at` (timestamptz, not null) - Publication date
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `articles`
      - `id` (uuid, primary key)
      - `category` (text, not null) - Either 'minhas-palavras' or 'sobre-escrita'
      - `title` (text, not null) - Title of the article
      - `slug` (text, unique, not null) - URL-friendly slug
      - `summary` (text) - Short summary
      - `content` (text, not null) - Full content
      - `image_url` (text) - Cover image URL
      - `published_at` (timestamptz, not null)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `books`
      - `id` (uuid, primary key)
      - `title` (text, not null) - Book title
      - `slug` (text, unique, not null) - URL-friendly slug
      - `cover_url` (text) - Book cover image URL
      - `description` (text, not null) - Book description
      - `full_description` (text) - Extended description
      - `purchase_links` (jsonb) - Links to purchase the book
      - `published_year` (integer) - Year of publication
      - `order_position` (integer, default 0) - Display order
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Sender's name
      - `email` (text, not null) - Sender's email
      - `message` (text, not null) - Message content
      - `submitted_at` (timestamptz, default now())
      - `read` (boolean, default false) - Whether the message has been read

  2. Security
    - Enable RLS on all tables
    - Public read access for news, articles, and books
    - Authenticated access for managing content
    - Anyone can submit contact forms
*/

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text,
  content text NOT NULL,
  image_url text,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('minhas-palavras', 'sobre-escrita')),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text,
  content text NOT NULL,
  image_url text,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  cover_url text,
  description text NOT NULL,
  full_description text,
  purchase_links jsonb,
  published_year integer,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news
CREATE POLICY "Anyone can view published news"
  ON news FOR SELECT
  USING (published_at <= now());

CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for articles
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (published_at <= now());

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for books
CREATE POLICY "Anyone can view books"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert books"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update books"
  ON books FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete books"
  ON books FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for contact submissions
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_books_order_position ON books(order_position);
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
