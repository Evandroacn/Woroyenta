import { useEffect, useRef, useState } from 'react'

const LINKS = ['MOVIMENTO', 'ESPECIES', 'APOIE']

const THEMES = [
  { id: 'alerta', num: '01', label: 'ALERTA', swatch: '#C8102E' },
  { id: 'mata', num: '02', label: 'MATA', swatch: '#5B6E22' },
  { id: 'sol', num: '03', label: 'SOL', swatch: '#F28C0F' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

export function Navbar() {
  const [theme, setTheme] = useState<ThemeId>(() => (localStorage.getItem('woro-theme') as ThemeId) || 'alerta')
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('woro-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center justify-between bg-ink px-6 md:h-[90px] md:px-12">
      <a href="#" aria-label="Woroyenta" className="relative isolate block">
        <img src="/assets/df134.png" alt="WORO YENTA" width={1226} height={450} className="h-[44px] w-auto md:h-[55px]" />
        {/* Tinge o quadrado do simbolo (31.8% da largura do asset) com a cor de destaque; o simbolo preto permanece preto */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[31.8%] bg-[var(--accent-color)] mix-blend-multiply" />
      </a>
      <nav className="flex gap-5 md:gap-10">
        {LINKS.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="font-display text-xs tracking-wide text-paper transition-colors hover:text-blood md:text-base">
            {l}
          </a>
        ))}
      </nav>
      <div ref={menuRef} className="relative">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}
          className="flex cursor-pointer items-center gap-2 font-display text-xs text-paper hover:text-blood md:text-base">
          TEMA
          <img src="/assets/8f492.svg" alt="" width={10} height={6} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <ul role="listbox" aria-label="Tema de cores"
            className="absolute right-0 top-[calc(100%+14px)] w-[210px] border-2 border-paper bg-ink shadow-[6px_6px_0_var(--accent-color)]">
            {THEMES.map((t) => {
              const active = t.id === theme
              return (
                <li key={t.id} role="option" aria-selected={active}>
                  <button type="button" onClick={() => { setTheme(t.id); setOpen(false) }}
                    className={`flex w-full cursor-pointer items-center gap-3 border-b border-paper/20 px-4 py-3 text-left last:border-b-0 ${active ? 'bg-paper text-ink' : 'text-paper hover:bg-paper/10'}`}>
                    <span className="size-4 shrink-0 border border-current" style={{ backgroundColor: t.swatch }} />
                    <span className="font-mono text-[11px] font-bold">{t.num}</span>
                    <span className="font-display text-sm tracking-wide">{t.label}</span>
                    {active && <span className="ml-auto font-mono text-[11px] font-bold">●</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </header>
  )
}

export default Navbar