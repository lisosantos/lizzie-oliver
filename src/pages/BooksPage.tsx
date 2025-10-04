import { useEffect, useState } from 'react';
import { supabase, type Book } from '../lib/supabase';
import { BookOpen, ExternalLink } from 'lucide-react';

type BooksPageProps = {
  onNavigate: (page: string) => void;
};

export default function BooksPage({ onNavigate }: BooksPageProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6DA] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="text-[#C9A227]" size={48} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-serif text-[#4B1E2F] mb-4"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Livros
          </h1>
          <div className="h-1 w-24 bg-[#C9A227] mx-auto"></div>
        </div>

        {loading ? (
          <div className="text-center text-[#4B1E2F]">Carregando...</div>
        ) : books.length > 0 ? (
          <div className="space-y-16">
            {books.map((book) => (
              <article
                key={book.id}
                className="bg-white rounded-lg overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 p-8 flex items-center justify-center bg-gradient-to-br from-[#4B1E2F] to-[#C9A227]">
                    {book.cover_url ? (
                      <img
                        src={book.cover_url}
                        alt={book.title}
                        className="max-h-96 rounded-lg shadow-2xl"
                      />
                    ) : (
                      <div className="aspect-[3/4] w-64 bg-white/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-[#F5E6DA]" size={80} />
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-2 p-8">
                    <h2
                      className="text-3xl font-serif text-[#4B1E2F] mb-4"
                      style={{ fontFamily: 'Merriweather, serif' }}
                    >
                      {book.title}
                    </h2>

                    {book.published_year && (
                      <p className="text-gray-600 mb-4">Publicado em {book.published_year}</p>
                    )}

                    <div className="h-px bg-[#C9A227] mb-6"></div>

                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {book.description}
                    </p>

                    {book.full_description && (
                      <div className="mb-6">
                        {book.full_description.split('\n').map((paragraph, index) => (
                          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}

                    {book.purchase_links && Object.keys(book.purchase_links).length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#4B1E2F] mb-4">
                          Onde comprar:
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {Object.entries(book.purchase_links).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-3 bg-[#C9A227] text-white font-semibold rounded-lg hover:bg-[#4B1E2F] transition-all transform hover:scale-105"
                            >
                              {platform}
                              <ExternalLink size={16} className="ml-2" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg p-12 shadow-lg">
            <p className="text-[#4B1E2F] text-lg">Nenhum livro cadastrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
