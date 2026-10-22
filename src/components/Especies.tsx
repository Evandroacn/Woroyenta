import { useState } from 'react'
import { useRef } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'

const RED = 'var(--accent-color)'
const F = 'font-title'

const ESPECIES = [
  {
    n: '01', logo: '/assets/especies/soldadinho.svg', t: 'SOLDADINHO-DO-ARARIPE',
    d: 'Guardião das águas da Chapada do Araripe. Os machos cantam junto às nascentes para se reproduzir, mas o uso inadequado da água, os incêndios e a perda da mata estão calando a espécie.',
  },
  {
    n: '02', logo: '/assets/especies/onca-parda.svg', t: 'ONCA-PARDA',
    d: 'Predadora de topo e essencial para o equilíbrio da mata. Perde território para a expansão agropecuária e urbana, e ainda enfrenta queimadas, rodovias e caça retaliatória.',
  },
  {
    n: '03', logo: '/assets/especies/sagui-do-tufo.svg', t: 'SAGUI-DO-TUFO',
    d: 'Sentinela das serras e brejos de altitude. Encurralado pela retirada de madeira, pela expansão agrícola e pelos condomínios e casas de veraneio que avançam sobre as encostas.',
  },
  {
    n: '04', logo: '/assets/especies/veado-catingueiro.svg', t: 'VEADO-CATINGUEIRO',
    d: 'Andarilho silencioso da caatinga e do cerrado da Chapada. A mata fragmentada o empurra para estradas e lavouras, onde atropelamentos e caça ilegal cortam sua passagem.',
  },
]

const CENSO = [
  { y: 2013, v: 540 }, { y: 2014, v: 528 }, { y: 2015, v: 514 }, { y: 2016, v: 487 },
  { y: 2017, v: 450 }, { y: 2018, v: 430 }, { y: 2019, v: 433 }, { y: 2020, v: 436 },
]
const MIN = 380, MAX = 560 // escala do eixo para dramatizar a queda

const IMPACTO = [
  { big: '-47%', t: 'CRATO (2013-2020)', d: 'Colapso de indivíduos maduros', cls: 'bg-[var(--accent-color)] text-on-accent border-2 border-[var(--accent-color)]' },
  { big: '-21,8%', t: 'BARBALHA (2014-2022)', d: 'Redução contínua de habitat', cls: 'bg-[#111111] text-paper border-2 border-[var(--accent-color)]' },
  { big: '+2%', t: 'MISSAO VELHA (2014-2022)', d: 'Prova de que proteger a mata funciona', cls: 'bg-paper text-[#111111] border-2 border-paper' },
]

const STEPS = ['01 SOLDADINHO', '02 ONCA-PARDA', '03 SAGUI', '04 VEADO', '05 DADOS']

function Frame({ n, logo }: { n: string; logo: string }) {
  const [ok, setOk] = useState(true)
  return (
    <div className="relative flex aspect-square w-full max-w-[520px] flex-col border-2 border-[#111111] p-4 shadow-[10px_10px_0px_#F2EFE9]" style={{ background: RED }}>
      <span className={`font-display text-[clamp(56px,6vw,110px)] leading-[0.8] text-paper`}>{n}</span>
      <div className="grid flex-1 place-items-center">
        {ok
          ? <img src={logo} alt="" width={205} height={234} onError={() => setOk(false)} className="h-[78%] w-auto max-w-[80%] object-contain drop-shadow-[6px_6px_0_#111111]" />
          : <div className="grid aspect-square w-[60%] place-items-center bg-[#111111]"><span className={`font-display text-[clamp(40px,5vw,96px)] text-[var(--accent-color)]`}>{n}</span></div>}
      </div>
    </div>
  )
}

function Bar({ v, y, i, p }: { v: number; y: number; i: number; p: MotionValue<number> }) {
  const h = ((v - MIN) / (MAX - MIN)) * 100
  const s = 0.81 + i * 0.016
  const height = useTransform(p, [s, s + 0.06], ['0%', `${h}%`])
  const last = i === CENSO.length - 1, first = i === 0
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
      <motion.div style={{ height }} className="relative flex w-full max-w-[72px] flex-col items-center"
        >
        <span className={`font-mono font-bold absolute -top-[1.2em] text-[clamp(16px,1.8vw,32px)] leading-none ${first || last ? 'text-[var(--accent-color)]' : 'text-paper'}`}>{v}</span>
        <div className="size-full border-2 border-paper"
          style={{ background: last ? RED : first ? '#F2EFE9' : `repeating-linear-gradient(180deg, #F2EFE9 0 6px, transparent 6px 10px)` }} />
      </motion.div>
      <span className="font-mono font-bold text-[10px] text-paper md:text-[12px]">{y}</span>
    </div>
  )
}

export function Especies() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setStep(Math.min(4, Math.floor(v * 5))))
  const spin = useTransform(p, [0, 1], [0, 360])
  const spinR = useTransform(p, [0, 1], [0, -360])
  const e = step < ESPECIES.length ? ESPECIES[step] : null

  return (
    <section ref={ref} id="especies" className="relative h-[500vh] bg-[#111111]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#111111] px-6 pt-[72px] md:px-[100px] md:pt-[90px]">
        <motion.img src="/assets/4b191.svg" alt="" aria-hidden width={300} height={300} style={{ rotate: spin }}
          className="pointer-events-none absolute -left-[150px] -top-[80px] size-[300px]" />
        <motion.img src="/assets/11c25.svg" alt="" aria-hidden width={300} height={300} style={{ rotate: spinR }}
          className="pointer-events-none absolute -right-[150px] -bottom-[80px] size-[300px]" />

        {/* Indicador de etapa */}
        <nav aria-label="Etapas" className="absolute top-1/2 right-3 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {STEPS.map((s, i) => (
            <span key={s} className={`font-display text-[10px] transition-colors ${i === step ? 'text-[var(--accent-color)]' : 'text-paper/30'}`}>
              {i === step ? '■ ' : '□ '}{s}
            </span>
          ))}
        </nav>

        <div className="relative mx-auto w-full max-w-[1500px]">
          <AnimatePresence mode="wait">
            {e ? (
              <motion.div key={e.n} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
                <div className="mx-auto hidden w-full max-w-[520px] md:block"><Frame n={e.n} logo={e.logo} /></div>
                <div className="flex flex-col items-start gap-5">
                  <h2 className={`${F} text-[clamp(40px,6vw,112px)] leading-[0.9] tracking-[-0.02em] text-paper uppercase`}>{e.t}</h2>
                  <p className="max-w-[680px] border-l-4 border-[var(--accent-color)] pl-4 font-sans text-[clamp(18px,1.5vw,26px)] leading-[1.25] text-paper">{e.d}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="dados" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }} className="flex flex-col gap-[clamp(16px,3vh,32px)]">
                <div className="flex justify-center">
                  <h2 className={`${F} -rotate-2 bg-[var(--accent-color)] p-[10px] text-center text-[clamp(22px,3.2vw,56px)] leading-none text-on-accent uppercase`}>
                    ALERTA VERMELHO: O CENSO DA EXTINCAO (2013-2020)
                  </h2>
                </div>

                <div className="relative h-[clamp(180px,32vh,340px)] pt-8">
                  {[0, 25, 50, 75, 100].map((g) => (
                    <div key={g} className="absolute inset-x-0 border-t border-dashed border-paper/25" style={{ bottom: `calc(${g}% * 0.86 + 22px)` }} />
                  ))}
                  <div className="relative flex h-full items-end gap-[clamp(6px,1.5vw,28px)]">
                    {CENSO.map((c, i) => <Bar key={c.y} v={c.v} y={c.y} i={i} p={p} />)}
                  </div>
                </div>
                <p className="text-center font-mono font-bold text-[11px] text-paper/70">INDIVÍDUOS MADUROS: 540 → 436</p>

                <div className="grid grid-cols-3 items-stretch gap-3 md:gap-6">
                  {IMPACTO.map((c) => (
                    <div key={c.t} className={`flex flex-col gap-1 p-[clamp(10px,1.4vw,24px)] ${c.cls}`}>
                      <span className={`font-mono font-bold text-[clamp(28px,4.4vw,84px)] leading-none`}>{c.big}</span>
                      <span className="font-display text-[clamp(9px,0.8vw,13px)]">{c.t}</span>
                      <span className="font-sans text-[clamp(12px,1vw,18px)] leading-tight">{c.d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Especies