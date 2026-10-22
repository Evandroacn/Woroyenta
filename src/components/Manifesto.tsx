import { AnimalPost, type Animal } from './AnimalPost'
import { useEffect, useRef, useState } from 'react'

type Card = {
  animal: Animal
  quando: string
  legenda: string
  apoios: string
  icons: [string, string, string, string]
  rot: number
}

// Dados extraidos fielmente do frame Figma (node 1:451 - GuerrillaWall)
// Posts do feed: artes padronizadas pela referencia do soldadinho
const CARDS: Card[] = [
  { animal: { foto: '/assets/posts/soldadinho.jpg', alt: 'Soldadinho-do-araripe pousado em um galho', cientifico: 'Antilophia bokermanni',
      nome: ['SOLDADINHO-', 'DO-ARARIPE'], chamada: 'RESULTADOS',
      texto: 'Governo federal assina criação do Refúgio de Vida Silvestre Soldadinho-do-Araripe, no Ceará, para proteger e recuperar o habitat da ave, sob risco de desaparecer.',
      tag: { left: 48, top: 42.8, minW: 40.6, minH: 9.4 } },
    quando: 'há 2 h', legenda: 'Vitória de quem não ficou calado. Agora é garantir que o refúgio saia do papel.', apoios: '6.310 apoios',
    icons: ['/assets/4fb63.svg', '/assets/500bc.svg', '/assets/3fe53.svg', '/assets/ec018.svg'], rot: -3 },
  { animal: { foto: '/assets/posts/sagui.jpg', alt: 'Dois saguis-do-tufo-branco abraçados', cientifico: 'Callithrix jacchus',
      nome: ['SAGUI-DO-', 'TUFO-BRANCO'], chamada: 'CUIDADO',
      texto: 'Alimentar esses animais prejudica a saúde deles, altera seus hábitos naturais e os torna dependentes dos humanos. Observe de longe. Não alimente!',
      tag: { left: 4.1, top: 38.5, minW: 42.1, minH: 10.4 } },
    quando: 'há 1 dia', legenda: 'Viu sagui na trilha? Guarde o lanche e a distância. Fauna silvestre não é pet.', apoios: '4.821 apoios',
    icons: ['/assets/053e7.svg', '/assets/74792.svg', '/assets/154da.svg', '/assets/f61dc.svg'], rot: 0 },
  { animal: { foto: '/assets/posts/veado.jpg', alt: 'Veado-catingueiro caminhando no campo', cientifico: 'Mazama gouazoubira',
      nome: ['VEADO-', 'CATINGUEIRO'], chamada: 'PRESERVE',
      texto: 'A caça ameaça a sobrevivência dessa espécie e desequilibra a natureza. Respeitar a vida silvestre é compromisso de todos nós. Não cace!',
      tag: { left: 50, top: 15.4, minW: 34.3, minH: 11.5 } },
    quando: 'há 3 dias', legenda: 'Denuncie caça na Chapada. Cada armadilha desmontada é uma vida que segue.', apoios: '3.987 apoios',
    icons: ['/assets/c2f85.svg', '/assets/3e502.svg', '/assets/3fe53.svg', '/assets/5a11a.svg'], rot: 3 },
]

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

// Progresso 0..1 do elemento atravessando a viewport
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const vh = window.innerHeight
      setP(clamp((vh - el.getBoundingClientRect().top) / (vh * 0.55)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return [ref, p] as const
}

function PostCard({ c, p }: { c: Card; p: number }) {
  const t = ease(p)
  return (
    <article
      className="flex flex-col border-2 border-ink bg-light pb-5 drop-shadow-[8px_8px_0px_var(--color-ransom)] will-change-transform"
      style={{ transform: `translateY(${(1 - t) * 260}px) rotate(${c.rot}deg)`, opacity: clamp(p * 1.6) }}>
      <header className="grid h-[64px] grid-cols-[42px_1fr] items-center gap-[9px] border-b-2 border-ink p-2">
        <img src="/assets/1e363.png" alt="" className="size-[42px] border-2 border-ink object-cover" />
        <div className="flex flex-col">
          <span className="font-sans font-bold text-[10px] leading-[15px] text-ink">@institutoworoyenta</span>
          <span className="font-sans text-[8px] leading-[12px] text-ink">Chapada do Araripe, Ceará · {c.quando}</span>
        </div>
      </header>

      <div className="group relative overflow-hidden border-b-2 border-ink">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <AnimalPost a={c.animal} />
        </div>
      </div>

      <div className="flex items-start gap-3 px-3 pt-3 pb-1">
        <button type="button" aria-label="Curtir"><img src={c.icons[0]} alt="" width={25} height={25} /></button>
        <button type="button" aria-label="Comentar"><img src={c.icons[1]} alt="" width={25} height={25} /></button>
        <button type="button" aria-label="Repostar"><img src={c.icons[2]} alt="" width={25} height={25} /></button>
        <button type="button" aria-label="Compartilhar" className="ml-auto"><img src={c.icons[3]} alt="" width={25} height={25} /></button>
      </div>
      <p className="px-3 font-sans font-bold text-[10px] text-ink">{c.apoios}</p>
      <p className="px-3 pt-[7px] pb-[10px] text-[14px] leading-[16.8px] text-ink">
        <span className="font-sans font-bold">@institutoworoyenta</span>
        <span className="font-sans">{' ' + c.legenda}</span>
      </p>
      <div className="mt-auto px-3 pt-1">
        <button type="button"
          className="flex min-h-[44px] w-full items-center justify-center border-2 border-ink bg-ink p-3 font-display text-[16px] text-on-accent btn-brutal">
          ESPALHAR NAS REDES
        </button>
      </div>
    </article>
  )
}

export function Manifesto() {
  const [titleRef, tp] = useScrollProgress<HTMLDivElement>()
  const [gridRef, gp] = useScrollProgress<HTMLDivElement>()
  return (
    <section id="manifesto" className="relative overflow-hidden bg-light px-6 pt-[130px] pb-[100px] md:px-[96px]">
      <img src="/assets/11c25.svg" alt="" aria-hidden width={300} height={300}
        className="pointer-events-none absolute -left-[149px] bottom-[-20px] size-[300px]" />

      <div ref={titleRef} className="flex justify-center"
        style={{ transform: `translateX(${(1 - ease(tp)) * 110}vw)` }}>
        <h2 className="-rotate-2 bg-blood p-[10px] text-center font-title text-[clamp(44px,6.94vw,128px)] leading-none tracking-[-4px] text-on-accent uppercase">
          Espalhe o manifesto
        </h2>
      </div>

      <div ref={gridRef} className="mx-auto mt-[90px] grid max-w-[1651px] gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <PostCard key={c.animal.foto} c={c} p={clamp(gp * 1.3 - i * 0.15)} />
        ))}
      </div>
    </section>
  )
}

export default Manifesto