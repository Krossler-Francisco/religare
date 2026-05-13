import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomSelect from '../components/CustomSelect.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { fetchPsychologists, loginAdmin } from '../services/adminAuthService.js'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [psychologists, setPsychologists] = useState([])
  const [selectedPsychologist, setSelectedPsychologist] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadPsychologists = async () => {
      try {
        const response = await fetchPsychologists()

        if (isMounted) {
          setPsychologists(response)
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Nao foi possivel carregar a lista de psicologos.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPsychologists()

    return () => {
      isMounted = false
    }
  }, [])

  const psychologistOptions = useMemo(
    () => psychologists.map((item) => `${item.name} - ${item.specialty}`),
    [psychologists],
  )
  const canSubmit = Boolean(selectedPsychologist && password.trim()) && !isLoading && !isSubmitting

  const handlePsychologistChange = (event) => {
    setSelectedPsychologist(event.target.value)
    setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const psychologist = psychologists.find(
      (item) => `${item.name} - ${item.specialty}` === selectedPsychologist,
    )

    if (!psychologist) {
      setErrorMessage('Selecione qual psicologo esta acessando o painel.')

      return
    }

    if (!password.trim()) {
      setErrorMessage('Informe a senha para acessar o painel.')

      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await loginAdmin({ psychologistId: psychologist.id, password })
      navigate('/admin/visao-geral', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
      <SiteHeader backTo="/" backLabel="Voltar para landing" />

      <section className="grid gap-6 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
        <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] px-6 py-8 shadow-[0_18px_50px_rgba(107,28,31,0.1)] sm:px-8 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#830910]">
            Area administrativa
          </p>
          <h1 className="font-display mt-4 text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-5xl">
            Entrar no painel Religare.
          </h1>
          <p className="mt-5 text-[0.95rem] leading-8 text-[#655651] sm:text-lg">
            Selecione o psicologo responsavel e informe a senha de acesso. Por enquanto,
            a validacao esta mockada e usa a senha padrao admin.
          </p>

          <div className="mt-8 rounded-2xl bg-[rgba(159,15,23,0.05)] p-5 text-sm leading-7 text-[#655651]">
            <p className="font-semibold text-[#351818]">Fluxo atual</p>
            <p className="mt-2">Lista de psicologos: mock de backend em servico dedicado.</p>
            <p>Senha temporaria: admin.</p>
            <p>Destino apos login: painel em /admin/visao-geral.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] px-6 py-8 shadow-[0_18px_50px_rgba(107,28,31,0.08)] sm:px-8 sm:py-10">
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-[#351818]">
              <span>Psicologo</span>
              <CustomSelect
                name="psychologist"
                value={selectedPsychologist}
                options={psychologistOptions}
                placeholder={isLoading ? 'Carregando psicologos...' : 'Selecione qual psicologo esta entrando'}
                onChange={handlePsychologistChange}
                className="min-h-13 w-full rounded-lg border border-[#d9c5bc] bg-white px-4 text-sm text-[#351818] outline-none transition focus:border-[#9f0f17]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#351818]">
              <span>Senha</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrorMessage('')
                }}
                placeholder="Digite a senha"
                className="min-h-13 w-full rounded-lg border border-[#d9c5bc] bg-white px-4 text-sm text-[#351818] outline-none transition placeholder:text-[#9a8781] focus:border-[#9f0f17]"
              />
            </label>

            {errorMessage ? (
              <p className="rounded-lg bg-[#fff1ec] px-4 py-3 text-sm text-[#830910]">{errorMessage}</p>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex min-h-13 items-center justify-center rounded-lg bg-[#9f0f17] px-6 text-sm font-semibold text-[#f8f4ed] transition hover:bg-[#830910] disabled:cursor-not-allowed disabled:bg-[#c58d90]"
            >
              {isSubmitting ? 'Entrando...' : 'Acessar painel'}
            </button>

            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#c7a49a] bg-white px-5 text-sm font-semibold text-[#351818] transition hover:bg-[#fff7f4]"
            >
              Voltar para a landing
            </Link>
          </form>
        </div>
      </section>
    </main>
  )
}

export default AdminLoginPage