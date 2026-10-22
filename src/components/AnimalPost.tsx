import type { CSSProperties } from 'react'

export type Animal = {
  foto: string
  alt: string
  cientifico: string
  nome: [string, string]
  chamada: string
  texto: string
  // Posicao da etiqueta cientifica sobre a foto (% da area da foto)
  tag: { left: number; top: number; minW: number; minH: number }
}

/** Arte de post 4:5 padronizada: foto, nome cientifico, faixa com o nome, chamada, texto e handle */
export function AnimalPost({ a }: { a: Animal }) {
  const tagStyle: CSSProperties = {
    left: `${a.tag.left - 1}%`, top: `${a.tag.top - 1}%`, minWidth: `${a.tag.minW + 2}%`, minHeight: `${a.tag.minH + 2}%`,
  }
  return (
    <div className="@container relative aspect-[4/5] w-full overflow-hidden bg-light text-ink">
      {/* Bordas de estrelas (recoloridas pela cor de destaque) */}
      <img src="/assets/a103e.svg" alt="" aria-hidden width={95} height={1135} className="absolute inset-y-0 left-0 h-full w-[10.2%] -scale-x-100" />
      <img src="/assets/8eab5.svg" alt="" aria-hidden width={95} height={1138} className="absolute inset-y-0 right-0 h-full w-[10.2%]" />

      <div className="absolute top-0 left-[10.2%] right-[10.2%] h-[49.6%] bg-ink">
        <img src={a.foto} alt={a.alt} width={860} height={670} loading="lazy" className="size-full object-cover" />
        <span className="absolute flex items-center justify-center bg-[var(--accent-color)] px-[1.6cqw] font-display text-[3.2cqw] font-bold leading-none text-on-accent" style={tagStyle}>
          ({a.cientifico})
        </span>
        <h3 className="absolute bottom-0 left-1/2 flex min-h-[14cqw] min-w-[58%] -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center bg-[var(--accent-color)] px-[3cqw] py-[1.4cqw] text-center font-title text-[5.4cqw] leading-[0.95] text-[#111111] uppercase">
          <span>{a.nome[0]}</span><span>{a.nome[1]}</span>
        </h3>
      </div>

      <div className="absolute inset-x-[14%] top-[58%] bottom-[4%] flex flex-col items-center text-center">
        <p className="font-title text-[11cqw] leading-none tracking-[-0.02em] uppercase">{a.chamada}</p>
        <p className="mt-[3.2cqw] font-sans text-[3.25cqw] leading-[1.28]">{a.texto}</p>
        <p className="mt-auto font-sans text-[2.6cqw] font-bold">@institutoworoyenta</p>
      </div>
    </div>
  )
}

export default AnimalPost