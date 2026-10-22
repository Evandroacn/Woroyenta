import { useEffect, useState } from 'react'

// Secoes em que o scroll vertical move o conteudo na horizontal
const HORIZONTAL = ['especies', 'apoie']

/** Indicador pulsante fixo no canto inferior direito: "SCROLL ME ↓" ou "SCROLL ⇄" */
export function ScrollHint() {
  const [mode, setMode] = useState<'down' | 'side' | 'end'>('down')
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      const doc = document.documentElement
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 40) return setMode('end')
      const side = HORIZONTAL.some((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect()
        return r && r.top <= mid && r.bottom >= mid
      })
      setMode(side ? 'side' : 'down')
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div aria-hidden
      className={`scroll-hint pointer-events-none fixed right-6 bottom-6 z-50 font-display text-[14px] tracking-wide text-paper uppercase transition-opacity duration-300 md:text-[16px] ${mode === 'end' ? 'opacity-0' : ''}`}>
      <span className="scroll-hint-pulse inline-block">{mode === 'side' ? 'SCROLL ⇄' : 'SCROLL ME ↓'}</span>
    </div>
  )
}

export default ScrollHint