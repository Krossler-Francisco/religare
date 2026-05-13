import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader.jsx'

const heroSequence = [
    {
        field: 'heading',
        value: 'Seja bem-vindo',
        mode: 'type',
        speed: 88,
        pause: 360,
    },
    {
        field: 'text',
        value: 'ao Projeto Religare!',
        mode: 'type',
        speed: 88,
        pause: 920,
    },
    {
        field: 'text',
        value: '',
        mode: 'delete',
        speed: 52,
        pause: 240,
    },
    {
        field: 'heading',
        value: 'Seja bem-vindo!',
        mode: 'type',
        speed: 110,
        pause: 300,
    },
    {
        field: 'text',
        value: 'É um prazer recebê-lo.',
        mode: 'type',
        speed: 80,
        pause: 0,
    },
]

const serviceHighlights = [
    {
        title: 'Acolhimento desde o primeiro contato',
        description: 'Uma escuta inicial organizada para acolher cada pessoa com seriedade, cuidado e clareza.',
    },
    {
        title: 'Atendimento online em todo o país',
        description: 'A modalidade virtual amplia o acesso ao cuidado psicológico com presença, continuidade e flexibilidade.',
    },
    {
        title: 'Um caminho de entrada confiável',
        description: 'A página foi pensada para orientar o primeiro contato de forma simples, humana e institucional.',
    },
]

const steps = [
    {
        number: '1',
        title: 'Preencha o formulário de acolhimento',
        description: 'O primeiro passo é preencher o formulário com suas informações iniciais, para que possamos compreender sua procura com mais clareza e cuidado.',
    },
    {
        number: '2',
        title: 'Participe da entrevista inicial',
        description: 'Depois do envio, acontece um primeiro encontro para conhecimento, escuta da demanda e alinhamento inicial do processo terapêutico.',
    },
    {
        number: '3',
        title: 'Inicie o acompanhamento terapêutico',
        description: 'Após essa etapa inicial, os atendimentos podem seguir com frequência semanal ou quinzenal, conforme a necessidade de cada paciente.',
    },
]

const features = [
    {
        title: 'Um espaço de escuta e acolhimento',
        description:
            'A proposta é oferecer uma porta de entrada respeitosa para pessoas que procuram apoio e orientação psicológica.',
    },
    {
        title: 'Um início mais simples e orientado',
        description:
            'A jornada foi desenhada para reduzir dúvidas iniciais e facilitar o começo do processo terapêutico.',
    },
    {
        title: 'Um contato inicial mais claro',
        description:
            'O formulário de acolhimento organiza o primeiro contato e ajuda a conduzir a entrada no atendimento.',
    },
]

const projectInitiatives = [
    {
        title: 'Atendimento psicológico online',
        description:
            'Oferecemos psicoterapia online com uma proposta de escuta qualificada, acolhimento e compromisso com o bem-estar emocional de cada pessoa atendida.',
    },
    {
        title: 'Palestras e seminários sobre saúde mental',
        description:
            'Além do atendimento terapêutico, também promovemos palestras e seminários voltados à saúde mental, ampliando o acesso à informação, prevenção e cuidado na comunidade.',
    },
]

const instagramHighlights = [
    {
        title: 'Lives e entrevistas com profissionais',
        description:
            'No Instagram, também realizamos encontros ao vivo e entrevistas com profissionais, abordando temas importantes da saúde mental com linguagem acessível, seriedade e troca qualificada.',
    },
    {
        title: 'Publicações sobre temas específicos da psicologia',
        description:
            'Além dos encontros ao vivo, compartilhamos conteúdos informativos sobre temas específicos da psicologia, como transtornos, sofrimento emocional, vínculos, ansiedade e outros assuntos relevantes para orientação e cuidado.',
    },
]

const faqs = [
    {
        question: 'Como faço para começar?',
        answer:
            'O primeiro passo é preencher o formulário de acolhimento. A partir dele, a entrada no atendimento pode ser organizada com mais clareza.',
    },
    {
        question: 'O atendimento é online?',
        answer:
            'Sim. A proposta do Projeto Religare é oferecer terapia virtual com uma experiência simples, direta e acolhedora.',
    },
    {
        question: 'Preciso saber exatamente o que dizer antes de preencher?',
        answer:
            'Não. A ideia do formulário é justamente facilitar esse começo e ajudar a estruturar o primeiro contato.',
    },
    {
        question: 'Para quem a terapia pode ser indicada?',
        answer:
            'A terapia pode ser um caminho importante para quem está passando por sofrimento emocional, dificuldades nos relacionamentos, ansiedade, angústia ou simplesmente sente que precisa de um espaço de escuta e orientação.',
    },
    {
        question: 'O que acontece depois do envio do formulário?',
        answer:
            'Depois do envio, as informações iniciais ajudam a organizar a entrada no atendimento e orientar o próximo passo com mais clareza.',
    },
    {
        question: 'Posso preencher o formulário mesmo sem ter certeza absoluta?',
        answer:
            'Sim. Muitas vezes, o mais difícil é começar. O formulário existe justamente para tornar esse primeiro movimento mais simples e possível.',
    },
]

function SectionTag({ children }) {
    return (
        <span className="inline-flex w-fit rounded-full bg-[#9f0f171a] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
            {children}
        </span>
    )
}

function LandingPage() {
    const [heroStep, setHeroStep] = useState(0)
    const [heroHeading, setHeroHeading] = useState('')
    const [heroText, setHeroText] = useState('')

    useEffect(() => {
        const currentStep = heroSequence[heroStep]

        if (!currentStep) {
            return undefined
        }

        const currentValue = currentStep.field === 'heading' ? heroHeading : heroText
        const setCurrentValue = currentStep.field === 'heading' ? setHeroHeading : setHeroText

        if (currentStep.mode === 'type') {
            if (currentValue === currentStep.value) {
                if (heroStep === heroSequence.length - 1) {
                    return undefined
                }

                const pauseTimer = window.setTimeout(() => {
                    setHeroStep((step) => step + 1)
                }, currentStep.pause)

                return () => window.clearTimeout(pauseTimer)
            }

            const typeTimer = window.setTimeout(() => {
                setCurrentValue(currentStep.value.slice(0, currentValue.length + 1))
            }, currentStep.speed)

            return () => window.clearTimeout(typeTimer)
        }

        if (currentValue.length === 0) {
            if (heroStep === heroSequence.length - 1) {
                return undefined
            }

            const pauseTimer = window.setTimeout(() => {
                setHeroStep((step) => step + 1)
            }, currentStep.pause)

            return () => window.clearTimeout(pauseTimer)
        }

        const deleteTimer = window.setTimeout(() => {
            setCurrentValue((currentText) => currentText.slice(0, -1))
        }, currentStep.speed)

        return () => window.clearTimeout(deleteTimer)
    }, [heroHeading, heroStep, heroText])

    const navItems = [
        { label: 'Projeto', href: '#projeto', type: 'anchor' },
        { label: 'Instagram', href: '#instagram', type: 'anchor' },
        { label: 'Sobre', href: '#sobre', type: 'anchor' },
        { label: 'Como funciona', href: '#como-funciona', type: 'anchor' },
        { label: 'Dúvidas', href: '#duvidas', type: 'anchor' },
        { label: 'Começar', to: '/formulario', type: 'route' },
    ]

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-3 py-6 sm:gap-28 sm:px-4 sm:py-8 lg:gap-32 lg:px-6">
            <SiteHeader navItems={navItems} />

            <section className="w-full px-2 py-10 sm:px-1 lg:py-14">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <div className="max-w-4xl space-y-1.5 sm:space-y-2">
                        <h1 className="font-display min-h-[1.2em] text-4xl leading-[0.95] tracking-tighter text-[#351818] sm:min-h-[1.2em] sm:text-6xl lg:min-h-[1.2em] lg:text-7xl">
                            {heroHeading}
                        </h1>
                        <p
                            className="font-display min-h-[1.2em] text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:min-h-[1.2em] sm:text-5xl lg:min-h-[1.2em] lg:text-6xl"
                            aria-live="polite"
                        >
                            {heroText}
                        </p>
                    </div>

                    <div className="mt-8 max-w-4xl space-y-6 text-center">
                        <p className="text-base leading-8 text-[#655651] sm:text-xl sm:leading-9">
                            O Projeto Religare é uma iniciativa social dedicada à oferta de
                            psicoterapia online para pessoas de todo o país, com uma proposta de cuidado
                            pautada em escuta, responsabilidade e acolhimento.
                        </p>
                        <p className="text-base leading-8 text-[#655651] sm:text-xl sm:leading-9">
                            Contamos com uma equipe de psicólogos formados e capacitados para oferecer
                            um atendimento sério, humano e comprometido com a singularidade de cada pessoa.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                        <Link
                            to="/formulario"
                            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#9f0f17] px-7 text-sm font-semibold text-[#f8f4ed] transition hover:bg-[#830910]"
                        >
                            Iniciar contato
                        </Link>
                        <a
                            href="#como-funciona"
                            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#c7a49a] bg-white px-7 text-sm font-semibold text-[#351818] transition hover:bg-[#fff7f4]"
                        >
                            Conheça a proposta
                        </a>
                    </div>

                </div>
            </section>

            <section
                id="projeto"
                className="w-full rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] px-6 py-10 shadow-[0_18px_50px_rgba(107,28,31,0.1)]"
            >
                <div className="mx-auto max-w-3xl text-center">
                    <SectionTag>Projeto Religare</SectionTag>
                    <h2 className="mt-4 font-display text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-5xl">
                        O que oferecemos
                    </h2>
                    <p className="mt-4 text-[0.95rem] leading-8 text-[#655651] sm:text-lg">
                        Reunimos iniciativas voltadas ao cuidado psicológico e à promoção da saúde
                        mental, com uma atuação que busca ampliar o acesso, fortalecer vínculos e
                        oferecer orientação com responsabilidade.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    {projectInitiatives.map((initiative) => (
                        <article
                            key={initiative.title}
                            className="rounded-2xl border border-[#e2d2ca] bg-[rgba(255,250,246,0.92)] p-7 text-center"
                        >
                            <h3 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-[2.6rem]">
                                {initiative.title}
                            </h3>
                            <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-8 text-[#655651] sm:text-lg">
                                {initiative.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="w-full gap-6">
                <div className="mt-12 grid w-full items-stretch gap-4 lg:grid-cols-3">
                    {steps.map((step) => (
                        <article
                            key={step.number}
                            className="flex h-full flex-col rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 text-left"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9f0f17] text-sm font-bold text-[#f8f4ed]">
                                {step.number}
                            </span>
                            <h2 className="font-display mt-4 min-h-12 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
                                {step.title}
                            </h2>
                            <p className="mt-3 text-[0.95rem] leading-7 text-[#655651] sm:text-sm">{step.description}</p>
                        </article>
                    ))}
                </div>


            </section>

            <section className="w-full gap-6">
                <div
                    id="formulario"
                    className="rounded-2xl flex justify-center text-center px-6 py-10"
                >
                    <div className="max-w-2xl space-y-4">
                        <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-5xl">
                            Quando sentir que é o momento, este pode ser o seu primeiro passo.
                        </h2>
                        <p className="text-[0.95rem] leading-8 text-[#655651] sm:text-base">
                            O formulário de acolhimento permite iniciar o contato de forma organizada e
                            cuidadosa, favorecendo a continuidade do atendimento.
                        </p>
                        <Link
                            to="/formulario"
                            className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-[#9f0f17] px-6 text-sm font-semibold text-[#f8f4ed] transition hover:bg-[#830910]"
                        >
                            Preencher formulário de acolhimento
                        </Link>
                    </div>
                </div>
            </section>

            <section
                id="instagram"
                className="w-full rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] px-6 py-10 shadow-[0_18px_50px_rgba(107,28,31,0.1)]"
            >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                    <div className="max-w-2xl space-y-4">
                        <SectionTag>Instagram</SectionTag>
                        <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-5xl">
                            Um espaço para conversa, orientação e informação em saúde mental.
                        </h2>
                        <p className="text-[0.95rem] leading-8 text-[#655651] sm:text-lg">
                            O Instagram do Projeto Religare amplia o cuidado para além do atendimento,
                            com conteúdos pensados para informar, aproximar e abrir discussões
                            importantes sobre psicologia de forma acessível e responsável.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {instagramHighlights.map((item) => (
                            <article
                                key={item.title}
                                className="flex h-full flex-col rounded-2xl bg-[rgba(159,15,23,0.05)] p-6 shadow-[0_12px_30px_rgba(107,28,31,0.06)]"
                            >
                                <h3 className="font-display text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-[2rem]">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-[0.95rem] leading-8 text-[#655651] sm:text-base">
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="duvidas"
                className="grid w-full gap-6 rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] px-6 py-10 shadow-[0_18px_50px_rgba(107,28,31,0.1)] lg:grid-cols-[minmax(0,0.7fr)_minmax(320px,1fr)]"
            >
                <div className="space-y-4">
                    <SectionTag>Dúvidas frequentes</SectionTag>
                    <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-5xl">
                        Perguntas frequentes.
                    </h2>
                    <p className="text-[0.95rem] leading-8 text-[#655651] sm:text-base">
                        Reunimos aqui algumas informações iniciais para tornar esse primeiro contato
                        mais tranquilo, claro e seguro.
                    </p>
                    <Link
                        to="/formulario"
                        className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-[#c7a49a] bg-white px-6 text-sm font-semibold text-[#351818] transition hover:bg-[#fff7f4]"
                    >
                        Acessar formulário
                    </Link>
                </div>

                <div className="space-y-3 w-full">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            className="group rounded-2xl bg-[rgba(255,250,246,0.92)] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(226,210,202,0.65)]"
                        >
                            <summary className="cursor-pointer list-none pr-8 text-left font-display text-lg leading-tight tracking-[-0.03em] text-[#351818] marker:content-none sm:text-xl">
                                {faq.question}
                            </summary>
                            <p className="mt-3 text-[0.95rem] leading-7 text-[#655651] sm:text-sm">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="grid w-full items-stretch gap-4 md:grid-cols-3">
                {serviceHighlights.map((item) => (
                    <article
                        key={item.title}
                        className="flex h-full flex-col rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-5 shadow-[0_18px_50px_rgba(107,28,31,0.08)]"
                    >
                        <strong className="block min-h-14 text-base font-semibold text-[#351818]">{item.title}</strong>
                        <p className="mt-2 text-sm leading-7 text-[#655651]">{item.description}</p>
                    </article>
                ))}
            </section>

            <footer className="mt-4 flex w-full flex-col gap-4 border-t border-[#d8c5bc] px-1 pt-8 pb-3 text-sm text-[#6b5a54] sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <p className="font-semibold uppercase tracking-[0.16em] text-[#351818]">Projeto Religare</p>
                    <p>Desenvolvido por Francisco Krossler.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Link to="/formulario" className="transition hover:text-[#351818]">
                        Começar terapia
                    </Link>
                    <Link to="/admin/login" className="transition hover:text-[#351818]">
                        Acessar painel
                    </Link>
                </div>
            </footer>
        </main>
    )
}

export default LandingPage