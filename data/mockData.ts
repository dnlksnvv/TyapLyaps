// Types
export interface Subject {
  id: string
  name: string
  description?: string
  color: string
  professor?: string
  credits: number
  currentProgress: number
  totalLabs: number
  completedLabs: number
  totalAttestations?: number
  completedAttestations?: number
  totalCourseworks?: number
  completedCourseworks?: number
  hasNotification: boolean
  hasLabNotification: boolean
  hasAttestationNotification: boolean
  hasCourseworkNotification: boolean
  status: 'active' | 'completed' | 'paused'
}

export interface User {
  id: string
  name: string
  email: string
  semester: string
  year: number
  university: string
}

export interface Collection {
  id: string
  name: string
  content: string
  description: string
  color: string
  progress: number
  itemsCount: number
  parentId?: string // Для вложенных коллекций
  type: 'collection' | 'task' // Тип элемента
  hasNotification?: boolean // Уведомления для коллекции
  tags?: CollectionTag[] // Теги из задач внутри коллекции
  createdAt: string
  updatedAt: string
}

export interface CollectionTag {
  id: string
  text: string
  bgClass: string
  textClass: string
  borderClass: string
  hasNotification: boolean
}

export interface Task {
  id: string
  name: string
  description: string
  color: string
  progress: number
  collectionId: string
  totalLabs: number
  completedLabs: number
  totalAttestations?: number
  completedAttestations?: number
  totalCourseworks?: number
  completedCourseworks?: number
  hasNotification: boolean
  hasLabNotification: boolean
  hasAttestationNotification: boolean
  hasCourseworkNotification: boolean
  status: 'active' | 'completed' | 'paused'
  createdAt: string
  updatedAt: string
}

// Mock data
export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Программирование',
    description: 'Основы программирования на Python',
    color: '#f0f6fc',
    professor: 'Иванов И.И.',
    credits: 4,
    currentProgress: 0,
    totalLabs: 9,
    completedLabs: 1,
    totalAttestations: 2,
    completedAttestations: 0,
    totalCourseworks: 1,
    completedCourseworks: 0,
    hasNotification: true,
    hasLabNotification: true,
    hasAttestationNotification: false,
    hasCourseworkNotification: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Методы и средства проектировани информационных систем и технологий',
    description: 'Высшая математика и математический анализ',
    color: '#8b949e',
    professor: 'Петров П.П.',
    credits: 5,
    currentProgress: 25,
    totalLabs: 15,
    completedLabs: 7,
    totalAttestations: 3,
    completedAttestations: 1,
    totalCourseworks: 1,
    completedCourseworks: 0,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: true,
    hasCourseworkNotification: false,
    status: 'active'
  },
  {
    id: '3',
    name: 'Физика',
    description: 'Общая физика и механика',
    color: '#6e7681',
    professor: 'Сидоров С.С.',
    credits: 3,
    currentProgress: 50,
    totalLabs: 6,
    completedLabs: 5,
    totalAttestations: 2,
    completedAttestations: 1,
    totalCourseworks: 0,
    completedCourseworks: 0,
    hasNotification: true,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'active'
  },
  {
    id: '4',
    name: 'Английский язык',
    description: 'Технический английский для IT',
    color: '#58a6ff',
    professor: 'Смирнова А.А.',
    credits: 2,
    currentProgress: 100,
    totalLabs: 4,
    completedLabs: 4,
    totalAttestations: 1,
    completedAttestations: 1,
    totalCourseworks: 0,
    completedCourseworks: 0,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'completed'
  },
  {
    id: '5',
    name: 'Базы данных',
    description: 'SQL и проектирование БД',
    color: '#f85149',
    professor: 'Козлов К.К.',
    credits: 6,
    currentProgress: 30,
    totalLabs: 12,
    completedLabs: 3,
    totalAttestations: 2,
    completedAttestations: 0,
    totalCourseworks: 1,
    completedCourseworks: 0,
    hasNotification: true,
    hasLabNotification: true,
    hasAttestationNotification: true,
    hasCourseworkNotification: false,
    status: 'active'
  },
  {
    id: '6',
    name: 'Веб-разработка',
    description: 'HTML, CSS, JavaScript',
    color: '#a5a5a5',
    professor: 'Новиков Н.Н.',
    credits: 3,
    currentProgress: 75,
    totalLabs: 8,
    completedLabs: 7,
    totalAttestations: 2,
    completedAttestations: 1,
    totalCourseworks: 1,
    completedCourseworks: 1,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'active'
  }
]

export const mockUser: User = {
  id: '1',
  name: 'Студент',
  email: 'student@university.edu',
  semester: 'Осенний 2024',
  year: 2,
  university: 'Университет'
}

export const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'УЧЁБА ВГУ',
    content: 'предметы',
    description: 'Мои предметы в ВГУ',
    color: '#f0f6fc',
    progress: 45,
    itemsCount: 8,
    type: 'collection',
    hasNotification: true,
    tags: [
      {
        id: '1',
        text: 'Программирование',
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        hasNotification: true
      },
      {
        id: '2',
        text: 'Математика',
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        hasNotification: false
      },
      {
        id: '3',
        text: 'Физика',
        bgClass: 'bg-yellow-500/20',
        textClass: 'text-yellow-300',
        borderClass: 'border-yellow-500/30',
        hasNotification: true
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  }
]

export const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Программирование',
    description: 'Основы программирования на Python',
    color: '#f0f6fc',
    progress: 0,
    collectionId: '1',
    totalLabs: 9,
    completedLabs: 1,
    totalAttestations: 2,
    completedAttestations: 0,
    totalCourseworks: 1,
    completedCourseworks: 0,
    hasNotification: true,
    hasLabNotification: true,
    hasAttestationNotification: false,
    hasCourseworkNotification: true,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Методы и средства проектирования информационных систем и технологий',
    description: 'Высшая математика и математический анализ',
    color: '#8b949e',
    progress: 25,
    collectionId: '1',
    totalLabs: 15,
    completedLabs: 7,
    totalAttestations: 3,
    completedAttestations: 1,
    totalCourseworks: 1,
    completedCourseworks: 0,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: true,
    hasCourseworkNotification: false,
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Физика',
    description: 'Общая физика и механика',
    color: '#6e7681',
    progress: 50,
    collectionId: '1',
    totalLabs: 6,
    completedLabs: 5,
    totalAttestations: 2,
    completedAttestations: 1,
    totalCourseworks: 0,
    completedCourseworks: 0,
    hasNotification: true,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    name: 'Английский язык',
    description: 'Технический английский для IT',
    color: '#58a6ff',
    progress: 100,
    collectionId: '1',
    totalLabs: 4,
    completedLabs: 4,
    totalAttestations: 1,
    completedAttestations: 1,
    totalCourseworks: 0,
    completedCourseworks: 0,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'completed',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-25'
  },
  {
    id: '5',
    name: 'Базы данных',
    description: 'SQL и проектирование БД',
    color: '#f85149',
    progress: 30,
    collectionId: '1',
    totalLabs: 12,
    completedLabs: 3,
    totalAttestations: 2,
    completedAttestations: 0,
    totalCourseworks: 1,
    completedCourseworks: 0,
    hasNotification: true,
    hasLabNotification: true,
    hasAttestationNotification: true,
    hasCourseworkNotification: false,
    status: 'active',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: '6',
    name: 'Веб-разработка',
    description: 'HTML, CSS, JavaScript',
    color: '#a5a5a5',
    progress: 75,
    collectionId: '1',
    totalLabs: 8,
    completedLabs: 7,
    totalAttestations: 2,
    completedAttestations: 1,
    totalCourseworks: 1,
    completedCourseworks: 1,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-21'
  }
]
