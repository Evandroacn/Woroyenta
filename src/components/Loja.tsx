import { useRef, useEffect, useState } from 'react';

interface Produto {
  id: string;
  categoria: string;
  preco: string;
  estado: string;
  titulo: string;
  descricao: string;
  imagem: string;
  alt: string;
  cta: string;
}

// Mockups oficiais do Instituto Woroyenta (public/assets/loja)
const PRODUTOS: Produto[] = [
  { id: '01', categoria: 'DOACAO', preco: 'QUALQUER VALOR', estado: 'CONTRIBUICAO LIVRE', titulo: 'AJUDE DOANDO', cta: 'QUERO APOIAR',
    descricao: 'Contribua com qualquer valor. Cada real vira combustível de brigada, muda nativa e trilha patrulhada.',
    imagem: '/assets/loja/carteira.jpg', alt: 'Peça de couro vermelha com o símbolo Woroyenta em branco' },
  { id: '02', categoria: 'CAMISETA', preco: 'R$ 89', estado: 'EM ESTOQUE', titulo: 'OVERSIZED BRANCA', cta: 'QUERO APOIAR',
    descricao: 'Modelagem ampla, estampa preta nas costas com logo e símbolo. Vista a causa por onde passar.',
    imagem: '/assets/loja/tshirt-branca.jpg', alt: 'Pessoa de costas vestindo camiseta oversized branca com logo Woroyenta preta' },
  { id: '03', categoria: 'CAMISETA', preco: 'R$ 79', estado: 'PRE-VENDA', titulo: 'VERMELHA SIMBOLO', cta: 'QUERO APOIAR',
    descricao: 'Logo discreta na frente, símbolo gigante nas costas. Para ser visto de longe.',
    imagem: '/assets/loja/tshirt-vermelha.jpg', alt: 'Camiseta vermelha de frente com logo pequena e de costas com símbolo grande' },
  { id: '04', categoria: 'CANECA', preco: 'R$ 60', estado: 'EM ESTOQUE', titulo: 'CANECA SOL', cta: 'QUERO APOIAR',
    descricao: 'Esmaltada branca com borda laranja: logo de um lado, fauna em xilogravura do outro. Café forte para a madrugada de brigada.',
    imagem: '/assets/loja/caneca.jpg', alt: 'Canecas esmaltadas brancas com borda laranja, logo Woroyenta e ilustração de fauna' },
  { id: '05', categoria: 'CANECA', preco: 'R$ 60', estado: 'EM ESTOQUE', titulo: 'CANECA ALERTA', cta: 'QUERO APOIAR',
    descricao: 'Esmaltada branca com borda preta e estampas em vermelho: logo de um lado, sagui em xilogravura do outro.',
    imagem: '/assets/loja/caneca-vermelha.jpg', alt: 'Canecas esmaltadas brancas com borda preta, logo Woroyenta vermelha e ilustração de sagui' },
  { id: '06', categoria: 'KIT PINS', preco: 'R$ 30', estado: 'ULTIMAS UNIDADES', titulo: 'PINS FAUNA', cta: 'QUERO APOIAR',
    descricao: 'Três bottons pretos: símbolo vermelho, onça verde e soldadinho-do-araripe laranja.',
    imagem: '/assets/loja/pins.jpg', alt: 'Três bottons pretos com símbolo vermelho, onça verde e soldadinho laranja' },
  { id: '07', categoria: 'KIT PINS', preco: 'R$ 30', estado: 'EM ESTOQUE', titulo: 'PINS LOGO', cta: 'QUERO APOIAR',
    descricao: 'Três bottons nas cores do movimento: laranja, verde e vermelho, com a logo Woroyenta sobre a fauna da Chapada.',
    imagem: '/assets/loja/pins-logo.jpg', alt: 'Três bottons laranja, verde e vermelho com a logo Woroyenta' },
  { id: '08', categoria: 'PULSEIRAS', preco: 'R$ 15', estado: 'EM ESTOQUE', titulo: 'FITAS DE PULSO', cta: 'QUERO APOIAR',
    descricao: 'Par de fitas verde e vermelha com a tipografia Woroyenta. Para marcar quem está na resistência.',
    imagem: '/assets/loja/pulseiras.jpg', alt: 'Duas fitas de pulso, verde e vermelha, com a palavra Woroyenta' },
  { id: '09', categoria: 'ECOBAG', preco: 'R$ 45', estado: 'EM ESTOQUE', titulo: 'TOTE BAG PRETA', cta: 'QUERO APOIAR',
    descricao: 'Sacola de algodão preta com a logo Woroyenta em branco. Resistente para a feira, a trilha e o protesto.',
    imagem: '/assets/loja/tote-bag.jpg', alt: 'Pessoa caminhando com tote bag preta estampada com a logo Woroyenta em branco' },
];

export function Loja() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const [maxShift, setMaxShift] = useState(0);

  // Deslocamento maximo = largura real da trilha (com 48px de padding direito) - largura visivel
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current, viewport = viewportRef.current;
      if (!track || !viewport) return;
      setMaxShift(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const docScrollable = document.documentElement.scrollHeight - window.innerHeight;
      setPageProgress(docScrollable > 0 ? window.scrollY / docScrollable : 0);
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desloca a fileira de 8 cards ate o Card 08 encostar a 48px da margem direita
  const translateX = -(scrollProgress * maxShift);

  return (
    <section
      id="apoie"
      ref={sectionRef}
      style={{
        height: '300vh',
        position: 'relative',
        backgroundColor: 'var(--bg-light)',
      }}
    >
      <div
        ref={viewportRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 0',
          boxSizing: 'border-box',
        }}
      >
        {/* Estrelas pontiagudas (mesmo asset das outras secoes) girando com o scroll da pagina */}
        <img src="/assets/4b191.svg" alt="" aria-hidden width={300} height={300}
          style={{ position: 'absolute', top: '-40px', left: '-60px', width: '180px', height: '180px', zIndex: 1, pointerEvents: 'none', transform: `rotate(${pageProgress * 180}deg)` }} />
        <img src="/assets/11c25.svg" alt="" aria-hidden width={300} height={300}
          style={{ position: 'absolute', bottom: '-20px', right: '-60px', width: '190px', height: '190px', zIndex: 1, pointerEvents: 'none', transform: `rotate(${-pageProgress * 180}deg)` }} />

        {/* Título Principal Inclinado */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--accent-color)',
              padding: '10px',
              transform: 'rotate(-1.5deg)',
              boxShadow: '0 2px 0 rgba(0,0,0,0.15)',
            }}
          >
            <h2
              style={{
                margin: '0 0 clamp(32px, 4vw, 64px) 0',
                color: 'var(--text-on-accent)',
                fontFamily: "'WoroyentaFont', sans-serif",
                fontSize: 'clamp(44px, 6.94vw, 128px)',
                letterSpacing: '-4px',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              APOIE NOSSA CAUSA!
            </h2>
          </div>
        </div>

        {/* Trilha Horizontal dos 8 Cards */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 'clamp(32px, 2.6vw, 48px)',
            paddingLeft: '48px',
            paddingRight: '48px',
            width: 'max-content',
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: 'transform 0.08s linear',
            zIndex: 2,
          }}
        >
          {PRODUTOS.map((item) => (
            <div
              key={item.id}
              style={{
                width: '300px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Quadro Vermelho com Moldura Preta */}
              <div
                style={{
                  backgroundColor: 'var(--accent-color)',
                  border: '1.5px solid #111111',
                  height: '300px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '12px',
                    zIndex: 1,
                    backgroundColor: 'var(--accent-color)',
                    padding: '2px 6px',
                    color: 'var(--text-on-accent)',
                    fontFamily: "'Cabin', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {item.id}
                </span>

                {/* Mockup do produto */}
                <img src={item.imagem} alt={item.alt} width={1080} height={1080} loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', right: '10px', bottom: '10px', backgroundColor: '#111111', color: '#F2EFE9',
                  padding: '4px 8px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {item.estado}
                </span>
              </div>

              {/* Informações do Produto */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#111111',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                <span>{item.categoria}</span>
                <span>{item.preco}</span>
              </div>

              <h3
                style={{
                  margin: '6px 0 8px 0',
                  fontSize: '22px',
                  color: '#111111',
                  fontFamily: "'WoroyentaFont', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {item.titulo}
              </h3>

              <p style={{ margin: '0 0 14px 0', minHeight: '54px', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', lineHeight: 1.4, color: '#111111', opacity: 0.8 }}>
                {item.descricao}
              </p>

              {/* Botão Vestir a Causa */}
              <button type="button" className="loja-btn btn-brutal">
                <span>{item.cta}</span>
                <span className="loja-btn-arrow" aria-hidden>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Loja;