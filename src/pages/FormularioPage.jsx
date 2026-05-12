import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomSelect from '../components/CustomSelect.jsx'
import SiteHeader from '../components/SiteHeader.jsx'

const formSections = [
  {
    title: 'Identificação',
    description: 'Informações iniciais para organizar o primeiro contato com clareza.',
    fields: [
      {
        name: 'email',
        label: 'E-mail',
        type: 'email',
        placeholder: 'Seu e-mail para contato',
        required: true,
      },
      {
        name: 'fullName',
        label: 'Nome completo',
        type: 'text',
        placeholder: 'Digite seu nome completo',
        required: true,
      },
      {
        name: 'birthDate',
        label: 'Data de nascimento',
        type: 'date',
        required: true,
      },
      {
        name: 'guardianName',
        label: 'Nome completo do responsável ( se necessário )',
        type: 'text',
        placeholder: 'Preencher quando a pessoa for menor de idade',
      },
      {
        name: 'contactPhones',
        label: 'Telefones para contato',
        type: 'text',
        placeholder: 'Informe até 2 números',
        required: true,
      },
      {
        name: 'city',
        label: 'Cidade',
        type: 'text',
        placeholder: 'Cidade onde você mora',
      },
      {
        name: 'district',
        label: 'Bairro',
        type: 'text',
        placeholder: 'Bairro',
      },
    ],
  },
  {
    title: 'Contexto social',
    description: 'Compreender o contexto social para um acolhimento mais direcionado.',
    fields: [
      {
        name: 'education',
        label: 'Escolaridade',
        type: 'select',
        required: true,
        options: [
          'Ensino fundamental incompleto',
          'Ensino fundamental completo',
          'Ensino médio incompleto',
          'Ensino médio completo',
          'Ensino superior incompleto',
          'Ensino superior completo',
          'Pós-graduação',
        ],
      },
      {
        name: 'profession',
        label: 'Profissão',
        type: 'text',
        placeholder: 'Sua ocupação atual',
        required: true,
      },
      {
        name: 'familyIncome',
        label: 'Renda familiar mensal',
        type: 'radio',
        required: true,
        options: [
          'De 0 a R$ 1.000,00',
          'De R$ 1.000,00 a R$ 2.000,00',
          'De R$ 2.000,00 a R$ 3.000,00',
          'Mais de R$ 3.000,00',
        ],
      },
      {
        name: 'socialBenefit',
        label: 'Recebe algum benefício da assistência social?',
        type: 'radio',
        options: ['Não', 'Sim, Bolsa Família', 'Sim, Benefício de Prestação Continuada (BPC)'],
      },
    ],
  },
  {
    title: 'Histórico e motivo do contato',
    description: 'Entender o histórico e o motivo da procura.',
    fields: [
      {
        name: 'previousCare',
        label: 'Já fez acompanhamento psicológico ou psiquiátrico?',
        type: 'radio',
        required: true,
        options: ['Sim', 'Não'],
      },
      {
        name: 'psychiatricMedication',
        label: 'Faz ou já fez uso de medicamento psiquiátrico?',
        type: 'radio',
        required: true,
        options: ['Sim', 'Não'],
      },
      {
        name: 'mainReason',
        label: 'Qual principal motivo de sua procura pelo atendimento psicológico?',
        type: 'textarea',
        required: true,
        rows: 5,
        helperText:
          'Este formulário é sigiloso e apenas os psicólogos do Projeto terão acesso a esta descrição.',
        placeholder: 'Descreva brevemente o principal motivo da sua procura.',
      },
      {
        name: 'relatedPerson',
        label: 'Algum familiar ou pessoa próxima está recebendo atendimento psicológico pelo Projeto Religare?',
        type: 'text',
        placeholder: 'Se sim, informe quem.',
      },
      {
        name: 'howFoundUs',
        label: 'Como conheceu o Projeto Religare?',
        type: 'radio',
        required: true,
        options: ['Instagram', 'Facebook', 'Indicação de terceiros', 'Outro'],
      },
    ],
  },
  {
    title: 'Disponibilidade e acordo inicial',
    description: 'Verificar e alinhar horários.',
    fields: [
      {
        name: 'preferredTime',
        label: 'Qual o melhor período para marcar o atendimento?',
        type: 'radio',
        required: true,
        options: [
          'Matutino (das 8h às 12h)',
          'Vespertino (das 13h às 17h)',
          'Noturno (das 18h às 21h)',
        ],
      },
      {
        name: 'socialFeeAgreement',
        label:
          'Você está de acordo com o atendimento online a valor social (não gratuito), com o acordo a ser estabelecido no primeiro atendimento?',
        type: 'radio',
        required: true,
        options: ['Sim', 'Não'],
      },
    ],
  },
]

const initialValues = {
  email: '',
  fullName: '',
  birthDate: '',
  guardianName: '',
  contactPhones: '',
  city: '',
  district: '',
  education: '',
  profession: '',
  familyIncome: '',
  socialBenefit: '',
  previousCare: '',
  psychiatricMedication: '',
  mainReason: '',
  relatedPerson: '',
  howFoundUs: '',
  preferredTime: '',
  socialFeeAgreement: '',
}

const supportTextClass = 'text-base leading-8 text-[#655651] sm:text-xl sm:leading-9'

function Field({ field, value, onChange }) {
  const baseInputClass =
    'min-h-13 w-full rounded-2xl border border-[#d9c5bc] bg-white px-4 text-sm text-[#351818] outline-none transition placeholder:text-[#9a8781] focus:border-[#9f0f17]'

  if (field.type === 'textarea') {
    return (
      <label className="grid gap-2 text-sm font-medium text-[#351818]">
        <span>
          {field.label}
          {field.required ? ' *' : ''}
        </span>
        {field.helperText ? (
          <span className="text-sm font-normal leading-6 text-[#7b6861]">{field.helperText}</span>
        ) : null}
        <textarea
          name={field.name}
          value={value}
          onChange={onChange}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={`${baseInputClass} py-3`}
        />
      </label>
    )
  }

  if (field.type === 'select') {
    return (
      <label className="grid gap-2 text-sm font-medium text-[#351818]">
        <span>
          {field.label}
          {field.required ? ' *' : ''}
        </span>
        <CustomSelect
          name={field.name}
          value={value}
          options={field.options}
          placeholder="Selecione uma opção"
          onChange={onChange}
          className={`${baseInputClass} flex items-center`}
        />
      </label>
    )
  }

  if (field.type === 'radio') {
    return (
      <fieldset className="grid gap-3 rounded-2xl bg-[rgba(255,250,246,0.92)] p-4">
        <legend className="text-sm font-medium text-[#351818]">
          {field.label}
          {field.required ? ' *' : ''}
        </legend>
        <div className="grid gap-3">
          {field.options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ead6cf] bg-white px-4 py-3 text-sm text-[#655651] transition hover:border-[#c7a49a]"
            >
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="mt-1 h-4 w-4 accent-[#9f0f17]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  return (
    <label className="grid gap-2 text-sm font-medium text-[#351818]">
      <span>
        {field.label}
        {field.required ? ' *' : ''}
      </span>
      {field.helperText ? (
        <span className="text-sm font-normal leading-6 text-[#7b6861]">{field.helperText}</span>
      ) : null}
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className={baseInputClass}
      />
    </label>
  )
}

function FormularioPage() {
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
      <SiteHeader backTo="/" backLabel="Voltar ao início" />
      <section className="flex w-full flex-col gap-6">
        <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
          <div className="space-y-4">
            <h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-4xl">
              Um primeiro passo conduzido com clareza e acolhimento.
            </h2>
          </div>

          <form className="mt-10 grid gap-8">
            {formSections.map((section) => (
              <section
                key={section.title}
                className="rounded-3xl border border-[#e6d4cd] bg-[rgba(255,252,248,0.9)] p-6"
              >
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
                    {section.title}
                  </h3>
                  <p className={`mt-3 ${supportTextClass}`}>{section.description}</p>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <div
                      key={field.name}
                      className={field.type === 'radio' || field.type === 'textarea' ? 'md:col-span-2' : ''}
                    >
                      <Field
                        field={field}
                        value={formValues[field.name]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <button
              type="button"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#9f0f17] px-6 text-sm font-semibold text-[#f8f4ed] transition hover:bg-[#830910]"
            >
              Enviar inscrição
            </button>
          </form>
        </div>

        <aside className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#e2d2ca] bg-[linear-gradient(180deg,rgba(252,234,227,0.95),rgba(255,249,241,0.95))] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
            <h2 className="font-display text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
              Antes de preencher
            </h2>
            <div className={`mt-4 space-y-4 ${supportTextClass}`}>
              <p>O atendimento acontece na modalidade online e é destinado a pessoas a partir de 16 anos.</p>
              <p>Procure responder com calma para que possamos compreender melhor sua situação inicial.</p>
              <p>As informações enviadas são tratadas com sigilo e acessadas apenas pela equipe do Projeto Religare.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
            <h3 className="font-display text-xl leading-none tracking-[-0.04em] text-[#351818] sm:text-2xl">
              Informações importantes
            </h3>
            <div className={`mt-4 space-y-4 ${supportTextClass}`}>
              <p>Se a pessoa atendida for menor de idade, preencha também o campo com o nome do responsável.</p>
              <p>Ao final do formulário, você poderá indicar o melhor período para o atendimento.</p>
              <p>O acordo sobre o valor social do atendimento será tratado no primeiro contato com a equipe.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default FormularioPage