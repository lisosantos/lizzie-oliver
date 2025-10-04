import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ArticleListPage from './pages/ArticleListPage';
import BooksPage from './pages/BooksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

type Route = {
  path: string;
  params?: Record<string, string>;
};

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>({ path: '/' });

  const handleNavigate = (path: string) => {
    const newsMatch = path.match(/^\/noticias\/(.+)$/);
    if (newsMatch) {
      setCurrentRoute({ path: '/noticias/:slug', params: { slug: newsMatch[1] } });
      window.scrollTo(0, 0);
      return;
    }

    const minhasPalavrasMatch = path.match(/^\/minhas-palavras\/(.+)$/);
    if (minhasPalavrasMatch) {
      setCurrentRoute({
        path: '/minhas-palavras/:slug',
        params: { slug: minhasPalavrasMatch[1] },
      });
      window.scrollTo(0, 0);
      return;
    }

    const sobreEscritaMatch = path.match(/^\/sobre-escrita\/(.+)$/);
    if (sobreEscritaMatch) {
      setCurrentRoute({
        path: '/sobre-escrita/:slug',
        params: { slug: sobreEscritaMatch[1] },
      });
      window.scrollTo(0, 0);
      return;
    }

    setCurrentRoute({ path });
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    const { path, params } = currentRoute;

    switch (path) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/noticias':
        return <NewsListPage onNavigate={handleNavigate} />;
      case '/noticias/:slug':
        return <NewsDetailPage slug={params?.slug || ''} onNavigate={handleNavigate} />;
      case '/minhas-palavras':
        return <ArticleListPage category="minhas-palavras" onNavigate={handleNavigate} />;
      case '/sobre-escrita':
        return <ArticleListPage category="sobre-escrita" onNavigate={handleNavigate} />;
      case '/livros':
        return <BooksPage onNavigate={handleNavigate} />;
      case '/sobre':
        return <AboutPage />;
      case '/contato':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const getCurrentPagePath = () => {
    if (currentRoute.path.includes(':slug')) {
      return currentRoute.path.replace('/:slug', '');
    }
    return currentRoute.path;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={getCurrentPagePath()} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
