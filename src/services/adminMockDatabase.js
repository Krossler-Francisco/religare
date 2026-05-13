export const adminOverviewSnapshot = {
  updatedAt: 'Hoje, 14:20',
  metrics: [
    { label: 'Visitas na landing', value: 1248, detail: '+12% na semana', tone: 'bg-[#fde9e2] text-[#830910]' },
    { label: 'Formularios enviados', value: 146, detail: '11,7% de conversao', tone: 'bg-[#f8e5de] text-[#8a5727]' },
    { label: 'Primeira entrevista', value: 61, detail: '41,8% dos formularios', tone: 'bg-[#f3ebe6] text-[#6f4439]' },
    { label: 'Pacientes ativos', value: 34, detail: '55,7% das entrevistas', tone: 'bg-[#efe4da] text-[#5f4a42]' },
  ],
  funnel: [
    { id: 'visits', label: 'Visitas', value: 1248, ratio: 100 },
    { id: 'forms', label: 'Formularios', value: 146, ratio: 11.7 },
    { id: 'interviews', label: 'Primeira entrevista', value: 61, ratio: 4.9 },
    { id: 'patients', label: 'Pacientes', value: 34, ratio: 2.7 },
  ],
  operationalBreakdown: [
    { label: 'Em aberto', count: 52, detail: 'Solicitacoes que ainda aguardam definicao.' },
    { label: 'Em primeira entrevista', count: 18, detail: 'Casos que avancaram para o primeiro encontro.' },
    { label: 'Assumidos por psicologos', count: 34, detail: 'Pacientes que ja sairam do fluxo operacional do projeto.' },
    { label: 'Aguardando retorno', count: 11, detail: 'Pessoas que ainda precisam de resposta ou reencaminhamento.' },
  ],
}

export const adminQueueEntries = [
  {
    id: 'Q-1001',
    patientName: 'Luciana A.',
    status: 'Novo',
    assignedPsychologistId: 'ricardo-falleiros',
    submittedAt: 'Hoje, 09:40',
    urgency: 'Alta',
  },
  {
    id: 'Q-1002',
    patientName: 'Marcos F.',
    status: 'Primeira entrevista',
    assignedPsychologistId: 'samuel',
    submittedAt: 'Hoje, 10:15',
    urgency: 'Media',
  },
  {
    id: 'Q-1003',
    patientName: 'Helena P.',
    status: 'Triagem',
    assignedPsychologistId: 'giovani',
    submittedAt: 'Hoje, 11:30',
    urgency: 'Alta',
  },
  {
    id: 'Q-1004',
    patientName: 'Renato S.',
    status: 'Paciente',
    assignedPsychologistId: 'giovani',
    submittedAt: 'Ontem, 18:20',
    urgency: 'Baixa',
  },
  {
    id: 'Q-1005',
    patientName: 'Camila R.',
    status: 'Novo',
    assignedPsychologistId: 'samuel',
    submittedAt: 'Ontem, 16:10',
    urgency: 'Media',
  },
  {
    id: 'Q-1006',
    patientName: 'Bruna L.',
    status: 'Novo',
    assignedPsychologistId: null,
    submittedAt: 'Hoje, 12:20',
    urgency: 'Alta',
  },
  {
    id: 'Q-1007',
    patientName: 'Diego M.',
    status: 'Triagem',
    assignedPsychologistId: null,
    submittedAt: 'Hoje, 13:05',
    urgency: 'Media',
  },
  {
    id: 'Q-1008',
    patientName: 'Fernanda C.',
    status: 'Novo',
    assignedPsychologistId: null,
    submittedAt: 'Hoje, 14:10',
    urgency: 'Alta',
  },
  {
    id: 'Q-1009',
    patientName: 'Igor P.',
    status: 'Triagem',
    assignedPsychologistId: null,
    submittedAt: 'Ontem, 19:25',
    urgency: 'Baixa',
  },
]

export const adminCalendarEventTemplates = [
  {
    day: 3,
    events: [
      {
        type: 'form',
        patientName: 'Luciana A.',
        time: '09:40',
        assignedPsychologistName: 'Ricardo Falleiros',
      },
      {
        type: 'form',
        patientName: 'Rafael N.',
        time: '15:10',
        assignedPsychologistName: 'Giovani',
      },
    ],
  },
  {
    day: 6,
    events: [
      {
        type: 'interview',
        patientName: 'Marcos F.',
        time: '10:30',
        interviewStatus: 'Marcada',
        assignedPsychologistName: 'Samuel',
      },
    ],
  },
  {
    day: 9,
    events: [
      {
        type: 'assignment',
        patientName: 'Marcos F.',
        time: '18:20',
        assignedPsychologistName: 'Samuel',
        note: 'A partir daqui, o caso sai do painel do projeto e passa a ser acompanhado pelo psicologo.',
      },
    ],
  },
  {
    day: 12,
    events: [
      {
        type: 'form',
        patientName: 'Helena P.',
        time: '11:30',
        assignedPsychologistName: 'Giovani',
      },
      {
        type: 'interview',
        patientName: 'Camila R.',
        time: '13:30',
        interviewStatus: 'Marcada',
        assignedPsychologistName: 'Samuel',
      },
    ],
  },
  {
    day: 15,
    events: [
      {
        type: 'form',
        patientName: 'Bianca T.',
        time: '08:45',
        assignedPsychologistName: null,
      },
      {
        type: 'assignment',
        patientName: 'Camila R.',
        time: '16:00',
        assignedPsychologistName: 'Samuel',
        note: 'Paciente assumida e retirada do fluxo operacional do Projeto Religare.',
      },
    ],
  },
  {
    day: 18,
    events: [
      {
        type: 'interview',
        patientName: 'Luciana A.',
        time: '09:00',
        interviewStatus: 'Marcada',
        assignedPsychologistName: 'Ricardo Falleiros',
      },
      {
        type: 'form',
        patientName: 'Bruna L.',
        time: '12:20',
        assignedPsychologistName: null,
      },
    ],
  },
  {
    day: 21,
    events: [
      {
        type: 'form',
        patientName: 'Paulo C.',
        time: '17:20',
        assignedPsychologistName: 'Samuel',
      },
      {
        type: 'form',
        patientName: 'Diego M.',
        time: '13:05',
        assignedPsychologistName: null,
      },
    ],
  },
  {
    day: 24,
    events: [
      {
        type: 'interview',
        patientName: 'Helena P.',
        time: '14:00',
        interviewStatus: 'Concluida',
        assignedPsychologistName: 'Ricardo Falleiros',
      },
    ],
  },
  {
    day: 25,
    events: [
      {
        type: 'assignment',
        patientName: 'Helena P.',
        time: '18:10',
        assignedPsychologistName: 'Ricardo Falleiros',
        note: 'Caso encaminhado para acompanhamento fora do painel operacional do projeto.',
      },
    ],
  },
  {
    day: 28,
    events: [
      {
        type: 'form',
        patientName: 'Joao M.',
        time: '12:05',
        assignedPsychologistName: null,
      },
      {
        type: 'form',
        patientName: 'Fernanda C.',
        time: '14:10',
        assignedPsychologistName: null,
      },
      {
        type: 'form',
        patientName: 'Igor P.',
        time: '19:25',
        assignedPsychologistName: null,
      },
    ],
  },
]

export const adminAnalyticsSnapshot = {
  periodLabel: 'Ultimos 30 dias',
  funnelBreakdown: [
    { label: 'Visitas na pagina', value: 1248, percentage: 100 },
    { label: 'Conversao em formulario', value: 146, percentage: 11.7 },
    { label: 'Avancaram para entrevista', value: 61, percentage: 41.8 },
    { label: 'Viraram pacientes', value: 34, percentage: 55.7 },
  ],
  weeklyVisits: [
    { label: 'Sem 1', visits: 260, forms: 29 },
    { label: 'Sem 2', visits: 284, forms: 31 },
    { label: 'Sem 3', visits: 318, forms: 38 },
    { label: 'Sem 4', visits: 386, forms: 48 },
  ],
}

export const adminPatients = [
  {
    id: 'P-201',
    name: 'Cecilia M.',
    psychologistId: 'ricardo-falleiros',
    frequency: 'Semanal',
    stage: 'Paciente ativa',
    nextSession: '14 Mai, 14:00',
  },
  {
    id: 'P-202',
    name: 'Helena P.',
    psychologistId: 'ricardo-falleiros',
    frequency: 'Quinzenal',
    stage: 'Primeira entrevista concluida',
    nextSession: '16 Mai, 09:30',
  },
  {
    id: 'P-203',
    name: 'Paula V.',
    psychologistId: 'samuel',
    frequency: 'Quinzenal',
    stage: 'Paciente ativa',
    nextSession: '13 Mai, 16:00',
  },
  {
    id: 'P-204',
    name: 'Rafael N.',
    psychologistId: 'giovani',
    frequency: 'Semanal',
    stage: 'Acompanhamento inicial',
    nextSession: '14 Mai, 11:00',
  },
  {
    id: 'P-205',
    name: 'Marina T.',
    psychologistId: 'giovani',
    frequency: 'Semanal',
    stage: 'Paciente ativa',
    nextSession: '15 Mai, 18:00',
  },
  {
    id: 'P-206',
    name: 'Camila R.',
    psychologistId: 'samuel',
    frequency: 'Semanal',
    stage: 'Primeira entrevista agendada',
    nextSession: '17 Mai, 13:30',
  },
]