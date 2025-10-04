import { useEffect, useState } from 'react';
import { supabase, type News } from '../lib/supabase';
import { Calendar, ArrowLeft } from 'lucide-react';

type NewsDetailPageProps = {
  slug: string;
  onNavigate: (page: string) => void;
};

export default function NewsDetailPage({ slug, onNavigate }: NewsDetailPageProps) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [slug]);

  const loadNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      setNews(data);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5E6DA] py-24 flex items-center justify-center">
        <div className="text-[#4B1E2F]">Carregando...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-[#F5E6DA] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-12 shadow-lg text-center">
            <p className="text-[#4B1E2F] text-lg mb-6">Notícia não encontrada.</p>
            <button
              onClick={() => onNavigate('/noticias')}
              className="inline-flex items-center text-[#C9A227] hover:text-[#4B1E2F] transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar para notícias
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6DA] py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('/noticias')}
          className="inline-flex items-center text-[#4B1E2F] hover:text-[#C9A227] transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para notícias
        </button>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          {news.image_url && (
            <div className="h-96 bg-[#E5E5E5] overflow-hidden">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar size={16} className="mr-2" />
              <time>{formatDate(news.published_at)}</time>
            </div>

            <h1
              className="text-3xl md:text-4xl font-serif text-[#4B1E2F] mb-6"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              {news.title}
            </h1>

            <div className="h-px bg-[#C9A227] mb-8"></div>

            <div
              className="prose prose-lg max-w-none"
              style={{
                color: '#374151',
                lineHeight: '1.75',
              }}
            >
              {news.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
