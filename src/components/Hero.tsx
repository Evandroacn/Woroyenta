const MARQUEE = ['FICAR CALADO É SER CUMPLICE', 'JUNTE-SE A RESITÊNCIA']

function Star() {
  return <img src="/assets/4b191.svg" alt="" aria-hidden width={300} height={300} className="mx-6 inline-block size-[0.9em] align-[-0.1em]" />
}

export function Hero() {
  const items = Array.from({ length: 6 }, () => MARQUEE).flat()
  return (
    <section className="relative isolate min-h-[min(100svh,1141px)] overflow-hidden bg-ink pt-[72px] md:pt-[90px]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <img src="/assets/0065a.png" alt="" width={733} height={493} className="size-full object-cover object-[right_center]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Faixas de estrelas laterais (assets originais) */}
      <img src="/assets/a103e.svg" alt="" aria-hidden width={95} height={1135}
        className="pointer-events-none absolute top-[72px] bottom-0 left-0 h-[calc(100%-72px)] w-[clamp(48px,6.6vw,95px)] -scale-x-100 md:top-[90px] md:h-[calc(100%-90px)]" />
      <img src="/assets/8eab5.svg" alt="" aria-hidden width={95} height={1138}
        className="pointer-events-none absolute top-[72px] right-0 bottom-0 h-[calc(100%-72px)] w-[clamp(48px,6.6vw,95px)] md:top-[90px] md:h-[calc(100%-90px)]" />

      <div className="relative z-10 flex flex-col items-start gap-[clamp(16px,3vh,32px)] px-[clamp(56px,10.85vw,200px)] py-[clamp(24px,5vh,80px)] pb-[clamp(220px,22vw,420px)]">
        <h1 className="flex flex-col items-start font-title text-[clamp(58px,min(10.8vw,16.5vh),210px)] leading-[0.88] tracking-[-0.02em] uppercase">
          <span className="-mb-3 -rotate-2 bg-ink p-[10px] text-paper">
            <span className="block">A gente</span>
            <span className="block">faz com</span>
          </span>
          <span className="rotate-2 bg-paper p-[10px] text-blood">AS MAOS</span>
        </h1>
        <p className="max-w-[27.6em] p-[10px] font-display text-[clamp(15px,min(1.6vw,2.6vh),28px)] leading-[1.247] text-paper uppercase">
          Woroyenta E um organismo vivo. A gente se junta, entra no mato e resolve.
        </p>
        <div className="relative z-10 mb-20 flex flex-wrap gap-6 opacity-100">
          <a href="#movimento" className="grid h-[clamp(48px,3.63vw,67px)] min-w-[clamp(160px,12.7vw,235px)] place-items-center border-2 border-[var(--accent-color)] bg-blood px-6 font-display text-[clamp(14px,1.1vw,20px)] text-on-accent btn-brutal">
            FACA PARTE
          </a>
          <a href="#apoie" className="grid h-[clamp(48px,3.63vw,67px)] min-w-[clamp(160px,12.7vw,235px)] place-items-center border-2 border-[var(--accent-color)] bg-paper px-6 font-display text-[clamp(14px,1.1vw,20px)] text-ink btn-brutal">
            APOIE A CAUSA
          </a>
        </div>
      </div>

      {/* Faixa diagonal com marquee */}
      <div className="pointer-events-none absolute z-0 bottom-[72px] left-[-10%] md:bottom-[96px] w-[120%] -rotate-[9.27deg] bg-ink py-3 md:py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[clamp(16px,1.4vw,26px)] text-paper">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1} className="flex items-center">
              {items.map((t, i) => (<span key={i} className="flex items-center"><Star />{t}</span>))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
