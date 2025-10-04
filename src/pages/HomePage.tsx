import { useEffect, useState } from 'react';
import { supabase, type News } from '../lib/supabase';
import { BookOpen, Sparkles } from 'lucide-react';

type HomePageProps = {
  onNavigate: (page: string) => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestNews();
  }, []);

  const loadLatestNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setLatestNews(data || []);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_7l17157l17157l17.png"
            alt="Banner Lizzie Oliver"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4B1E2F]/70 via-[#4B1E2F]/60 to-[#4B1E2F]/80" />
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 text-[#C9A227]">
            <Sparkles size={32} />
          </div>
          <div className="absolute top-40 right-20 text-[#C9A227]">
            <Sparkles size={24} />
          </div>
          <div className="absolute bottom-32 left-1/4 text-[#C9A227]">
            <Sparkles size={28} />
          </div>
          <div className="absolute bottom-20 right-1/3 text-[#C9A227]">
            <Sparkles size={20} />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-serif text-[#C9A227] mb-6 drop-shadow-lg"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Lizzie Oliver
          </h1>
          <p className="text-xl md:text-2xl text-[#F5E6DA] mb-8 leading-relaxed drop-shadow-md">
            Escritora de Fantasia – Semifinalista do Prêmio Jabuti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('/')}
              className="px-8 py-4 bg-[#C9A227] text-[#4B1E2F] font-semibold rounded-lg hover:bg-[#E5C464] transition-all transform hover:scale-105 shadow-lg"
            >
              Entre aqui
            </button>
            <button
              onClick={() => onNavigate('/leitores-jovens')}
              className="px-8 py-4 bg-[#F5E6DA] text-[#4B1E2F] font-semibold rounded-lg hover:bg-[#E5E5E5] transition-all transform hover:scale-105 shadow-lg"
            >
              Leitores Jovens
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5E6DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-[#C9A227] flex-1 max-w-xs"></div>
            <h2
              className="text-3xl md:text-4xl font-serif text-[#4B1E2F] mx-6"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              Últimas Notícias
            </h2>
            <div className="h-px bg-[#C9A227] flex-1 max-w-xs"></div>
          </div>

          {loading ? (
            <div className="text-center text-[#4B1E2F]">Carregando...</div>
          ) : latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {news.image_url && (
                    <div className="h-48 bg-[#E5E5E5] overflow-hidden">
                      <img
                        src={news.image_url}
                        alt={news.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-[#4B1E2F] mb-3 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                    <button
                      onClick={() => onNavigate(`/noticias/${news.slug}`)}
                      className="text-[#C9A227] font-semibold hover:text-[#4B1E2F] transition-colors"
                    >
                      Ler mais →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#4B1E2F]">
              <p>Nenhuma notícia publicada ainda.</p>
            </div>
          )}

          {latestNews.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('/noticias')}
                className="px-8 py-3 bg-[#4B1E2F] text-[#C9A227] font-semibold rounded-lg hover:bg-[#5C2538] transition-all"
              >
                Ver todas as notícias
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <BookOpen className="text-[#C9A227] mr-3" size={32} />
                <h2
                  className="text-3xl md:text-4xl font-serif text-[#4B1E2F]"
                  style={{ fontFamily: 'Merriweather, serif' }}
                >
                  RHOARS – Os Magiciens
                </h2>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                Descubra o universo mágico de RHOARS – Os Magiciens, obra de fantasia nacional que
                conquistou leitores e levou Lizzie Oliver às semifinais do Prêmio Jabuti.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Uma história envolvente que mistura magia, aventura e personagens inesquecíveis em
                um mundo único criado pela imaginação de uma das mais promissoras escritoras de
                fantasia do Brasil.
              </p>
              <button
                onClick={() => onNavigate('/livros/rhoars-os-magiciens')}
                className="px-8 py-4 bg-[#C9A227] text-white font-semibold rounded-lg hover:bg-[#4B1E2F] transition-all transform hover:scale-105 shadow-lg"
              >
                Conheça o livro
              </button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#4B1E2F] to-[#C9A227] rounded-lg shadow-2xl flex items-center justify-center">
                <BookOpen className="text-[#F5E6DA]" size={120} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
