import { useEffect, useState } from 'react';
import { supabase, type News } from '../lib/supabase';
import { Calendar } from 'lucide-react';

type NewsListPageProps = {
  onNavigate: (page: string) => void;
};

export default function NewsListPage({ onNavigate }: NewsListPageProps) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
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

  return (
    <div className="min-h-screen bg-[#F5E6DA] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-serif text-[#4B1E2F] mb-4"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Notícias
          </h1>
          <div className="h-1 w-24 bg-[#C9A227] mx-auto"></div>
        </div>

        {loading ? (
          <div className="text-center text-[#4B1E2F]">Carregando...</div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {item.image_url && (
                  <div className="h-56 bg-[#E5E5E5] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <time>{formatDate(item.published_at)}</time>
                  </div>
                  <h2 className="text-xl font-serif text-[#4B1E2F] mb-3 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                  <button
                    onClick={() => onNavigate(`/noticias/${item.slug}`)}
                    className="text-[#C9A227] font-semibold hover:text-[#4B1E2F] transition-colors"
                  >
                    Ler mais →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg p-12 shadow-lg">
            <p className="text-[#4B1E2F] text-lg">Nenhuma notícia publicada ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
