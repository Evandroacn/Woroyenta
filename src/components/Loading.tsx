import clsx from 'clsx'
import { useEffect, useState } from 'react'

/** Loading: alterna entre os símbolos dos animais antes de revelar a Home */
export function Loading({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // Lista com os 4 símbolos dos animais na pasta public
  const logos = [
    '/assets/especies/onca-parda.svg',
    '/assets/especies/sagui-do-tufo.svg',
    '/assets/especies/soldadinho.svg',
    '/assets/especies/veado-catingueiro.svg',
  ]

  useEffect(() => {
    // Alterna a logo ativa a cada 550ms
    const id = setInterval(() => {
      setStep((s) => (s + 1) % logos.length)
    }, 550)

    let alive = true
    let done: ReturnType<typeof setTimeout>

    // Garante tempo mínimo de exibição e espera o navegador carregar tudo
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    }).then(() => document.fonts?.ready)

    const minTime = new Promise((r) => setTimeout(r, 2200))
    const maxTime = new Promise((r) => setTimeout(r, 12000))

    Promise.race([Promise.all([pageLoaded, minTime]), maxTime]).then(() => {
      if (!alive) return
      clearInterval(id)
      setLeaving(true)
      done = setTimeout(onDone, 600)
    })

    document.documentElement.style.overflow = 'hidden'
    return () => {
      alive = false
      clearInterval(id)
      clearTimeout(done)
      document.documentElement.style.overflow = ''
    }
  }, [onDone, logos.length])

  return (
    <div
      role="status"
      aria-busy={!leaving}
      aria-label="Carregando Woroyenta"
      className={clsx(
        'fixed inset-0 z-50 grid place-items-center bg-ink transition-opacity duration-[600ms]',
        leaving && 'pointer-events-none opacity-0'
      )}
    >
      {/* Container estruturado em grid para empilhar e alternar perfeitamente as logos */}
      <div className="relative grid w-[min(320px,60vw)] aspect-square place-items-center">
        {logos.map((logo, index) => {
          const active = step === index
          return (
            <img
              key={logo}
              src={logo}
              alt="Símbolo Woroyenta"
              width={240}
              height={240}
              className={clsx(
                'absolute inset-0 m-auto w-full h-auto object-contain transition-all duration-300 ease-in-out',
                active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Loading