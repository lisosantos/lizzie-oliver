import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5E6DA] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Mail className="text-[#C9A227]" size={48} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-serif text-[#4B1E2F] mb-4"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Contato
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Entre em contato para dúvidas, sugestões ou parcerias.
          </p>
          <div className="h-1 w-24 bg-[#C9A227] mx-auto"></div>
        </div>

        <div className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="text-[#C9A227] mx-auto mb-6" size={64} />
              <h2 className="text-2xl font-serif text-[#4B1E2F] mb-4">
                Mensagem enviada com sucesso!
              </h2>
              <p className="text-gray-700 mb-8">
                Obrigada por entrar em contato. Responderei em breve.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-[#C9A227] text-white font-semibold rounded-lg hover:bg-[#4B1E2F] transition-all"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#4B1E2F] mb-2"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#4B1E2F] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[#4B1E2F] mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-lg focus:border-[#C9A227] focus:outline-none transition-colors resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-8 py-4 bg-[#C9A227] text-white font-semibold rounded-lg hover:bg-[#4B1E2F] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Enviar mensagem
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">Você também pode me encontrar em:</p>
          <a
            href="https://instagram.com/lizzieolivervs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#C9A227] hover:text-[#4B1E2F] transition-colors font-semibold"
          >
            Instagram: @lizzieolivervs
          </a>
        </div>
      </div>
    </div>
  );
}
