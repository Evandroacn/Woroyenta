import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

const BLOCOS = [
  { n: '01', t: 'AGUA E NASCENTES', d: 'Guarda das nascentes onde vive o soldadinho-do-araripe. Sem agua limpa, a especie desaparece.', head: 'bg-[#111111]', rot: -2, speed: 260 },
  { n: '02', t: 'BRIGADA E MATO', d: 'Vigilancia e combate direto a incendios, caca e corte ilegal de madeira.', head: 'bg-blood', rot: 1, speed: 420 },
  { n: '03', t: 'RESISTENCIA LOCAL', d: 'Comunidades organizadas contra condominios e loteamentos que devoram as serras.', head: 'bg-[#111111]', rot: -1, speed: 580 },
]

const MANIFESTO = 'WOROYENTA E ACAO DIRETA NA CHAPADA DO ARARIPE. NAO ESPERAMOS PERMISSAO NEM FICAMOS NO DISCURSO: ONDE A MATA E AMEACADA, A GENTE CHEGA PRIMEIRO.'
const WORDS = MANIFESTO.split(' ')

function Word({ w, i, p }: { w: string; i: number; p: MotionValue<number> }) {
  const start = i / WORDS.length
  const opacity = useTransform(p, [start, start + 1 / WORDS.length], [0.18, 1])
  return <motion.span style={{ opacity }} className="inline-block whitespace-pre">{w + ' '}</motion.span>
}

function Card({ b, i, p }: { b: (typeof BLOCOS)[number]; i: number; p: MotionValue<number> }) {
  // cada card parte de um deslocamento diferente (parallax) e converge para 0 com atraso em cascata
  const s = 0.1 * i
  const y = useTransform(p, [s, 0.55 + s], [b.speed, 0])
  const opacity = useTransform(p, [s, 0.25 + s], [0, 1])
  const rotate = useTransform(p, [s, 0.55 + s], [b.rot * 4, b.rot])
  return (
    <motion.article style={{ y, opacity, rotate }}
      className="flex flex-col border-2 border-[#111111] bg-light shadow-[6px_6px_0px_#111111]">
      <header className={`flex items-end justify-between border-b-2 border-[#111111] px-4 pt-4 pb-2 ${b.head}`}>
        <span className="font-display text-[clamp(72px,7vw,128px)] leading-[0.8] text-paper">{b.n}</span>
        <span className="font-mono text-[10px] leading-[15px] text-paper">@institutoworoyenta</span>
      </header>
      <div className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-6">
        <h3 className="font-display text-[clamp(22px,1.7vw,32px)] leading-none text-[#111111]">{b.n} / {b.t}</h3>
        <p className="font-sans text-[20px] leading-[1.2] text-[#111111]">{b.d}</p>
      </div>
    </motion.article>
  )
}

export function Movimento() {
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: tp } = useScroll({ target: titleRef, offset: ['start end', 'center center'] })
  const titleX = useTransform(tp, [0, 1], ['-60vw', '0vw'])
  const titleRot = useTransform(tp, [0, 1], [-8, -2])

  const { scrollYProgress: wp } = useScroll({ target: textRef, offset: ['start 85%', 'end 45%'] })
  const { scrollYProgress: cp } = useScroll({ target: cardsRef, offset: ['start end', 'center center'] })

  return (
    <section id="movimento" className="relative scroll-mt-[72px] overflow-hidden bg-light px-6 py-[clamp(64px,7vw,120px)] md:scroll-mt-[90px] md:px-[100px]">
      <img src="/assets/4b191.svg" alt="" aria-hidden width={300} height={300}
        className="pointer-events-none absolute -left-[147px] -top-[37px] size-[300px]" />
      <img src="/assets/11c25.svg" alt="" aria-hidden width={300} height={300}
        className="pointer-events-none absolute -right-[150px] bottom-[10%] size-[300px]" />

      <div className="relative mx-auto flex max-w-[1644px] flex-col items-center gap-16">
        <motion.div ref={titleRef} style={{ x: titleX, rotate: titleRot }}>
          <h2 className="bg-blood p-[10px] text-center font-title text-[clamp(44px,6.94vw,128px)] leading-none tracking-[-0.02em] text-on-accent uppercase">
            QUEM SOMOS: LINHA DE FRENTE
          </h2>
        </motion.div>

        <p ref={textRef} aria-label={MANIFESTO}
          className="max-w-[1000px] p-[10px] text-center font-sans font-semibold text-[clamp(20px,2.2vw,40px)] leading-[1.2] text-[#111111] uppercase">
          <span aria-hidden>{WORDS.map((w, i) => <Word key={i} w={w} i={i} p={wp} />)}</span>
        </p>

        <div ref={cardsRef} className="grid w-full gap-10 md:grid-cols-3 md:gap-8">
          {BLOCOS.map((b, i) => <Card key={b.n} b={b} i={i} p={cp} />)}
        </div>
      </div>
    </section>
  )
}

export default Movimento