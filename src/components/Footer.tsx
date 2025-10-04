import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-[#E5E5E5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-[#C9A227] text-xl font-serif mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Lizzie Oliver
            </h3>
            <p className="text-sm leading-relaxed">
              Escritora de Fantasia – Semifinalista do Prêmio Jabuti
            </p>
          </div>

          <div>
            <h4 className="text-[#C9A227] font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#C9A227] transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C9A227] transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C9A227] transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C9A227] font-semibold mb-4">Redes Sociais</h4>
            <a
              href="https://instagram.com/lizzieolivervs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm hover:text-[#C9A227] transition-colors"
            >
              <Instagram size={20} />
              <span>@lizzieolivervs</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5]/20 pt-8 text-center text-sm">
          <p>© 2025 Lizzie Oliver – Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
