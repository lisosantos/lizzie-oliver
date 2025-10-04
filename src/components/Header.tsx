import { Menu, X } from 'lucide-react';
import { useState } from 'react';

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Início', path: '/' },
    { label: 'Notícias', path: '/noticias' },
    { label: 'Em Minhas Palavras', path: '/minhas-palavras' },
    { label: 'Sobre Escrita', path: '/sobre-escrita' },
    { label: 'Livros', path: '/livros' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
  ];

  const handleNavigation = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#4B1E2F] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => handleNavigation('/')}
            className="text-2xl md:text-3xl font-serif text-[#C9A227] hover:text-[#E5C464] transition-colors"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Lizzie Oliver
          </button>

          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.path
                    ? 'text-[#C9A227]'
                    : 'text-[#E5E5E5] hover:text-[#C9A227]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden text-[#C9A227] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#4B1E2F] border-t border-[#C9A227]/20">
          <nav className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                  currentPage === item.path
                    ? 'text-[#C9A227] bg-[#C9A227]/10'
                    : 'text-[#E5E5E5] hover:text-[#C9A227] hover:bg-[#C9A227]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
