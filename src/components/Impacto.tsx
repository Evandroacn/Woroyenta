import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

// Frame "Impacto" (1:393): 1844 × 911, py 50, gap 24, coluna central 1365 × 811
const W = 1844, H = 911, PAD = 50, GAP = 24, CENTER = 1365, SIDE = (W - CENTER - GAP * 4) / 4
const PHOTOS = [
  { src: '/assets/a62e0.png', w: 1024, h: 1004 },
  { src: '/assets/171d1.png', w: 775, h: 477 },
  { src: '/assets/d8471.png', w: 600, h: 356 },
  { src: '/assets/7c676.png', w: 900, h: 600 },
  { src: '/assets/e4440.png', w: 1024, h: 767 },
]

type Piece = { t: string; size: number; lh: number; bg: string; fg: string; rot: number; pad?: boolean; archivo?: boolean }
const ink = 'bg-ink', paper = 'bg-paper', red = 'bg-ransom'
const tInk = 'text-ink', tPaper = 'text-paper', tRed = 'text-ransom'

const LINE1: Piece[] = [
  { t: 'A', size: 148, lh: 128, bg: ink, fg: tPaper, rot: -2 },
  { t: 'j', size: 112, lh: 96, bg: red, fg: tInk, rot: 4, archivo: true },
  { t: 'u', size: 120, lh: 128, bg: paper, fg: tInk, rot: -1 },
  { t: 'd', size: 96, lh: 120, bg: ink, fg: tRed, rot: -2 },
  { t: 'A', size: 148, lh: 128, bg: red, fg: tPaper, rot: 4 },
]
const LINE2: Piece[] = [
  { t: 's', size: 120, lh: 128, bg: paper, fg: tInk, rot: -1 },
  { t: 'a', size: 120, lh: 120, bg: ink, fg: tRed, rot: -2 },
  { t: 'l', size: 96, lh: 96, bg: red, fg: tInk, rot: 4 },
  { t: 'v', size: 128, lh: 128, bg: ink, fg: tPaper, rot: -2 },
  { t: 'A', size: 96, lh: 96, bg: red, fg: tPaper, rot: 4 },
  { t: 'r', size: 120, lh: 120, bg: ink, fg: tRed, rot: -2 },
]

function Cut({ p }: { p: Piece }) {
  return (
    <span className={clsx('inline-flex items-center justify-center', p.bg, p.pad && 'p-[10px]')} style={{ rotate: `${p.rot}deg` }}>
      <span className={clsx('whitespace-nowrap uppercase tracking-[-4px]', 'font-title', p.fg)}
        style={{ fontSize: p.size, lineHeight: `${p.lh}px` }}>{p.t}</span>
    </span>
  )
}

function Lettering() {
  return (
    <p aria-label="COM SUA AJUDA PODEMOS SALVAR A CHAPADA DO ARARIPE" className="flex flex-col items-center justify-center gap-2 text-center">
      <span aria-hidden className="flex items-center justify-center">
        <Cut p={{ t: 'Com sua', size: 128, lh: 96, bg: ink, fg: tPaper, rot: -2, pad: true }} />
        <span className="ml-[14px] flex items-center gap-[6px]">{LINE1.map((p, i) => <Cut key={i} p={p} />)}</span>
      </span>
      <span aria-hidden className="flex items-center justify-center">
        <Cut p={{ t: 'podemos', size: 128, lh: 96, bg: ink, fg: tPaper, rot: 2, pad: true }} />
        <span className="ml-[14px] flex items-center gap-[6px]">{LINE2.map((p, i) => <Cut key={i} p={p} />)}</span>
      </span>
      <span aria-hidden><Cut p={{ t: 'a chapada do araripe', size: 92, lh: 72, bg: ink, fg: tPaper, rot: 0, pad: true }} /></span>
    </p>
  )
}

export function Impacto() {
  const ref = useRef<HTMLElement>(null)
  const [p, setP] = useState(0)
  const [s, setS] = useState(1)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setS(Math.min(el.clientWidth / W, vh / H))
      setP(Math.min(1, Math.max(0, -r.top / (r.height - vh))))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  const e = Math.min(1, p / 0.75)
  const ease = e * e * (3 - 2 * e)
  const grow = 1 + ease * (CENTER / SIDE - 1)
  const reveal = Math.max(0, (ease - 0.7) / 0.3)

  return (
    <section ref={ref} className="relative h-[280vh] bg-ink" aria-label="Com sua ajuda podemos salvar a Chapada do Araripe">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="flex w-full" style={{ height: H * s, padding: `${PAD * s}px 0`, gap: GAP * s }}>
          {PHOTOS.map((ph, i) => {
            const center = i === 2
            return (
              <div key={ph.src} className="relative h-full min-w-px overflow-hidden" style={{ flex: `${center ? grow : 1} 0 0` }}>
                <img src={ph.src} alt="" width={ph.w} height={ph.h} className={clsx('absolute inset-0 size-full object-cover', center && 'object-bottom')} />
                <div className="absolute inset-0 bg-black/30" />
                {center && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="shrink-0" style={{ transform: `scale(${s}) translateY(${(1 - reveal) * 40}px)`, opacity: reveal }}>
                      <Lettering />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Impacto