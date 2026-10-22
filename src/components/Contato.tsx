// Borda de papel rasgado: serrilhado irregular e deterministico (estilo colagem/zine)
const TEAR = (() => {
  let seed = 7
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  const pts: string[] = ['0,0', '0,34']
  for (let x = 0; x <= 1440; ) {
    x += 6 + rnd() * 22
    const y = 14 + rnd() * 30 + (rnd() > 0.85 ? 12 : 0)
    pts.push(`${Math.min(x, 1440).toFixed(1)},${y.toFixed(1)}`)
  }
  pts.push('1440,0')
  return `M${pts.join(' L')} Z`
})()

// Frentes de acao ja definidas no site (secao MOVIMENTO)
const FRENTES = ['AGUA E NASCENTES', 'BRIGADA E MATO', 'RESISTENCIA LOCAL']

const label = 'font-sans font-semibold text-[14px] text-paper'
const field = "h-[60px] w-full border-2 border-paper bg-transparent px-[15px] font-sans text-[12px] text-paper uppercase outline-none transition-colors duration-200 placeholder:text-[rgba(242,239,233,0.5)] focus:border-white focus:bg-white/[0.06] focus:outline-none focus-visible:border-white focus-visible:bg-white/[0.06] focus-visible:outline-none"

export function Contato() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-[#111111] px-6 pt-[130px] pb-[35px] md:px-[100px]">
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -top-px block h-[48px] w-full md:h-[60px]">
        <path d={TEAR} fill="var(--bg-light)" />
      </svg>
      <div className="mx-auto max-w-[1651px]">
        <h2 className="mx-auto flex flex-col items-center pt-5 text-center">
          <span className="mb-[-24px] flex flex-col items-center p-[10px] font-title text-[clamp(30px,7.2vw,164px)] leading-none tracking-[-0.02em] text-paper uppercase"
>
            <span className="whitespace-nowrap">Nao precisamos de</span>
            <span className="whitespace-nowrap">herois.</span>
          </span>
          <span className="mt-8 -rotate-2 whitespace-nowrap bg-paper p-[10px] font-title text-[clamp(30px,7.2vw,164px)] leading-none tracking-[-0.02em] text-blood uppercase">
            Precisamos de voce
          </span>
        </h2>

        <div className="flex flex-col gap-12 pt-[75px] lg:flex-row">
          <div className="flex flex-1 flex-col">
            <p className="max-w-[629px] font-display text-[clamp(24px,2.3vw,42px)] leading-[1.25] text-paper uppercase">
              Tem braco, tempo, conhecimento ou vontade? Ja serve. Entre para a próxima expedicao.
            </p>
            <div className="flex flex-col gap-2 pt-[50px] font-sans font-semibold text-[12px] text-paper uppercase lg:mt-auto">
              <a href="mailto:alexandre@comunidadesilvestre.org.br" className="underline hover:text-blood">alexandre@comunidadesilvestre.org.br</a>
              <a href="#" className="underline hover:text-blood">@institutoworoyenta</a>
            </div>
          </div>

          <form className="grid w-full gap-x-6 gap-y-8 sm:grid-cols-2 lg:w-[856px]" onSubmit={e => e.preventDefault()}>
            <label className="flex flex-col gap-[10px]">
              <span className={label}>SEU NOME</span>
              <input name="nome" required placeholder="informe o seu nome" className={field} />
            </label>
            <label className="flex flex-col gap-[10px]">
              <span className={label}>SEU E-MAIL</span>
              <input name="email" type="email" required placeholder="VOCE@EMAIL.COM" className={field} />
            </label>
            <label className="flex flex-col gap-[10px] sm:col-span-2">
              <span className={label}>COMO QUER AGIR?</span>
              <span className="relative">
                <select name="frente" required defaultValue="" className={`${field} cursor-pointer appearance-none pr-12 pl-[19px]`}>
                  <option value="" disabled>ESCOLHA UMA FRENTE</option>
                  {FRENTES.map(f => <option key={f} value={f} className="bg-ink">{f}</option>)}
                </select>
                <img src="/assets/8f492.svg" alt="" aria-hidden width={10} height={6}
                  className="pointer-events-none absolute top-1/2 right-[19px] -translate-y-1/2" />
              </span>
            </label>
            <button type="submit"
              className="min-h-[54px] cursor-pointer border-2 border-[var(--accent-color)] bg-[var(--accent-color)] px-6 py-4 font-display text-[24px] tracking-[-0.48px] text-on-accent btn-brutal sm:col-span-2">
              JUNTE-SE A RESISTENCIA
            </button>
          </form>
        </div>

        <div className="mt-[100px] flex flex-wrap items-end justify-between gap-4 border-t-2 border-paper pt-[25px]">
          <span className="relative isolate block">
            <img src="/assets/df134.png" alt="Woroyenta" width={1226} height={450} className="h-[55px] w-auto" />
            {/* Mesmo tratamento do header: quadrado do simbolo tingido com a cor de destaque do tema */}
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[31.8%] bg-[var(--accent-color)] mix-blend-multiply" />
          </span>
          <div className="flex gap-3 font-sans font-semibold text-[12px] text-[var(--accent-color)]">
            <span>CHAPADA DO ARARIPE — BRASIL</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contato