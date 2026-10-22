import { useCallback, useState } from 'react'
import { Loading } from './components/Loading'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Impacto } from './components/Impacto'
import { Movimento } from './components/Movimento'
import { Especies } from './components/Especies'
import { Loja } from './components/Loja'
import { Manifesto } from './components/Manifesto'
import { Contato } from './components/Contato'
import { ScrollHint } from './components/ScrollHint'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])
  return (
    <>
      {loading && <Loading onDone={done} />}
      <Navbar />
      <main><Hero /><Impacto /><Movimento /><Especies /><Loja /><Manifesto /></main>
      <Contato />
      {!loading && <ScrollHint />}
    </>
  )
}
