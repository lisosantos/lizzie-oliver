import { Award, Feather } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5E6DA] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-serif text-[#4B1E2F] mb-4"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Sobre Lizzie Oliver
          </h1>
          <div className="h-1 w-24 bg-[#C9A227] mx-auto"></div>
        </div>

        <div className="space-y-12">
          <section className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
            <div className="flex items-center mb-6">
              <Feather className="text-[#C9A227] mr-3" size={32} />
              <h2
                className="text-2xl md:text-3xl font-serif text-[#4B1E2F]"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                Biografia
              </h2>
            </div>
            <div className="h-px bg-[#C9A227] mb-6"></div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                Lizzie Oliver é uma escritora de fantasia nacional, semifinalista do Prêmio Jabuti,
                reconhecida por seu estilo inovador e profundo.
              </p>
              <p>
                Com uma habilidade única para criar mundos mágicos e personagens complexos, Lizzie
                conquistou um lugar de destaque na literatura fantástica brasileira. Sua obra prima,
                RHOARS – Os Magiciens, representa o início de uma saga envolvente que mistura
                elementos clássicos da fantasia com uma perspectiva contemporânea e autenticamente
                brasileira.
              </p>
              <p>
                Através de sua escrita, Lizzie Oliver transporta os leitores para universos onde a
                magia se entrelaça com questões profundamente humanas, criando narrativas que
                ressoam tanto com leitores jovens quanto adultos.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
            <div className="flex items-center mb-6">
              <Award className="text-[#C9A227] mr-3" size={32} />
              <h2
                className="text-2xl md:text-3xl font-serif text-[#4B1E2F]"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                Reconhecimento
              </h2>
            </div>
            <div className="h-px bg-[#C9A227] mb-6"></div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                O trabalho de Lizzie Oliver tem sido amplamente reconhecido no cenário literário
                nacional. Como semifinalista do prestigiado Prêmio Jabuti, uma das mais importantes
                premiações literárias do Brasil, sua obra demonstra excelência técnica e criativa.
              </p>
              <p>
                Além do reconhecimento crítico, Lizzie mantém presença ativa em feiras literárias e
                eventos culturais, onde compartilha sua paixão pela escrita e pela fantasia com
                leitores e aspirantes a escritores.
              </p>
              <p>
                Seu destaque na cena nacional representa não apenas um marco pessoal, mas também um
                importante passo para a visibilidade da literatura de fantasia produzida no Brasil,
                contribuindo para o crescimento e reconhecimento do gênero no país.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#4B1E2F] to-[#C9A227] rounded-lg p-8 md:p-12 shadow-xl text-center">
            <blockquote className="text-[#F5E6DA] text-xl md:text-2xl font-serif italic leading-relaxed">
              "A fantasia nos permite explorar verdades profundas através de mundos imaginários,
              revelando aspectos da natureza humana que muitas vezes permanecem ocultos na
              realidade cotidiana."
            </blockquote>
            <p className="text-[#F5E6DA] mt-6 font-semibold">— Lizzie Oliver</p>
          </section>
        </div>
      </div>
    </div>
  );
}
