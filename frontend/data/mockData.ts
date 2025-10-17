// Types
export interface SubjectTag {
  id: string
  text: string
  total: number
  completed: number
  bgClass: string
  textClass: string
  borderClass: string
  notificationCount: number
}

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
  notificationCount: number
  labNotificationCount: number
  attestationNotificationCount: number
  courseworkNotificationCount: number
  status: 'active' | 'completed' | 'paused'
  tags?: SubjectTag[]
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
  notificationCount?: number // Количество уведомлений для коллекции
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
  notificationCount: number
}

export interface CollectionType {
  id: string
  name: string
  color: string
  progress: number
  order: number
  itemsCount: number
  notificationCount?: number
  createdAt: string
  updatedAt: string
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
  notificationCount: number
  labNotificationCount: number
  attestationNotificationCount: number
  courseworkNotificationCount: number
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
    totalLabs: 12,
    completedLabs: 3,
    totalAttestations: 3,
    completedAttestations: 1,
    totalCourseworks: 2,
    completedCourseworks: 0,
    notificationCount: 1,
    labNotificationCount: 1,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 1,
    status: 'active',
    tags: [
      {
        id: 'labs',
        text: 'лабы',
        total: 12,
        completed: 3,
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 1
      },
      {
        id: 'attestations',
        text: 'аттестации',
        total: 3,
        completed: 1,
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 1
      },
      {
        id: 'courseworks',
        text: 'курсачи',
        total: 2,
        completed: 0,
        bgClass: 'bg-purple-500/20',
        textClass: 'text-purple-300',
        borderClass: 'border-purple-500/30',
        notificationCount: 1
      }
    ]
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
    totalCourseworks: 2,
    completedCourseworks: 0,
    notificationCount: 0,
    labNotificationCount: 0,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 0,
    status: 'active',
    tags: [
      {
        id: 'labs',
        text: 'лабы',
        total: 15,
        completed: 7,
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 0
      },
      {
        id: 'attestations',
        text: 'аттестации',
        total: 3,
        completed: 1,
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 1
      },
      {
        id: 'courseworks',
        text: 'курсачи',
        total: 2,
        completed: 0,
        bgClass: 'bg-purple-500/20',
        textClass: 'text-purple-300',
        borderClass: 'border-purple-500/30',
        notificationCount: 0
      }
    ]
  },
  {
    id: '3',
    name: 'Физика',
    description: 'Общая физика и механика',
    color: '#6e7681',
    professor: 'Сидоров С.С.',
    credits: 3,
    currentProgress: 50,
    totalLabs: 8,
    completedLabs: 6,
    totalAttestations: 3,
    completedAttestations: 2,
    totalCourseworks: 1,
    completedCourseworks: 0,
    notificationCount: 1,
    labNotificationCount: 1,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 1,
    status: 'active',
    tags: [
      {
        id: 'labs',
        text: 'лабы',
        total: 8,
        completed: 6,
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 1
      },
      {
        id: 'attestations',
        text: 'аттестации',
        total: 3,
        completed: 2,
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 1
      },
      {
        id: 'courseworks',
        text: 'курсачи',
        total: 1,
        completed: 0,
        bgClass: 'bg-purple-500/20',
        textClass: 'text-purple-300',
        borderClass: 'border-purple-500/30',
        notificationCount: 1
      }
    ]
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
    notificationCount: 0,
    labNotificationCount: 0,
    attestationNotificationCount: 0,
    courseworkNotificationCount: 0,
    status: 'completed',
    tags: [
      {
        id: 'labs',
        text: 'лабы',
        total: 4,
        completed: 4,
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 0
      },
      {
        id: 'attestations',
        text: 'аттестации',
        total: 1,
        completed: 1,
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 0
      }
    ]
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
    notificationCount: 1,
    labNotificationCount: 1,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 0,
    status: 'active',
    tags: [
      {
        id: 'labs',
        text: 'лабы',
        total: 12,
        completed: 3,
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 1
      },
      {
        id: 'attestations',
        text: 'аттестации',
        total: 2,
        completed: 0,
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 1
      },
      {
        id: 'courseworks',
        text: 'курсачи',
        total: 1,
        completed: 0,
        bgClass: 'bg-purple-500/20',
        textClass: 'text-purple-300',
        borderClass: 'border-purple-500/30',
        notificationCount: 0
      }
    ]
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
    notificationCount: 0,
    labNotificationCount: 0,
    attestationNotificationCount: 0,
    courseworkNotificationCount: 0,
    status: 'active',
    tags: [
      {
        id: 'labs',
        text: 'лабы',
        total: 8,
        completed: 7,
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 0
      },
      {
        id: 'attestations',
        text: 'аттестации',
        total: 2,
        completed: 1,
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 0
      },
      {
        id: 'courseworks',
        text: 'курсачи',
        total: 1,
        completed: 1,
        bgClass: 'bg-purple-500/20',
        textClass: 'text-purple-300',
        borderClass: 'border-purple-500/30',
        notificationCount: 0
      }
    ]
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
    notificationCount: 1,
    tags: [
      {
        id: '1',
        text: 'ПрограммированиеПрограммированиеПрограммирование',
        bgClass: 'bg-blue-500/20',
        textClass: 'text-blue-300',
        borderClass: 'border-blue-500/30',
        notificationCount: 1
      },
      {
        id: '2',
        text: 'Математика',
        bgClass: 'bg-green-500/20',
        textClass: 'text-green-300',
        borderClass: 'border-green-500/30',
        notificationCount: 0
      },
      {
        id: '3',
        text: 'Физика',
        bgClass: 'bg-yellow-500/20',
        textClass: 'text-yellow-300',
        borderClass: 'border-yellow-500/30',
        notificationCount: 1
      }
    ],
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
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
    notificationCount: 1,
    labNotificationCount: 1,
    attestationNotificationCount: 0,
    courseworkNotificationCount: 1,
    status: 'active',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
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
    notificationCount: 0,
    labNotificationCount: 0,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 0,
    status: 'active',
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-18T00:00:00.000Z'
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
    notificationCount: 3,
    labNotificationCount: 2,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 0,
    status: 'active',
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-22T00:00:00.000Z'
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
    notificationCount: 0,
    labNotificationCount: 0,
    attestationNotificationCount: 0,
    courseworkNotificationCount: 0,
    status: 'completed',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-25T00:00:00.000Z'
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
    notificationCount: 1,
    labNotificationCount: 1,
    attestationNotificationCount: 1,
    courseworkNotificationCount: 0,
    status: 'active',
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-01-19T00:00:00.000Z'
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
    notificationCount: 0,
    labNotificationCount: 0,
    attestationNotificationCount: 0,
    courseworkNotificationCount: 0,
    status: 'active',
    createdAt: '2024-01-08T00:00:00.000Z',
    updatedAt: '2024-01-21T00:00:00.000Z'
  }
]

// Mock data for collection types
export const mockCollectionTypes: CollectionType[] = [
  {
    id: 'type-1',
    name: 'Программирование',
    color: '#3B82F6',
    progress: 75,
    order: 1,
    itemsCount: 12,
    notificationCount: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-21T00:00:00.000Z'
  },
  {
    id: 'type-2',
    name: 'Математика',
    color: '#10B981',
    progress: 60,
    order: 2,
    itemsCount: 8,
    notificationCount: 0,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: 'type-3',
    name: 'Физика',
    color: '#F59E0B',
    progress: 45,
    order: 3,
    itemsCount: 6,
    notificationCount: 1,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-19T00:00:00.000Z'
  },
  {
    id: 'type-4',
    name: 'Английский язык',
    color: '#EF4444',
    progress: 90,
    order: 4,
    itemsCount: 15,
    notificationCount: 0,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-22T00:00:00.000Z'
  },
  {
    id: 'type-5',
    name: 'История',
    color: '#8B5CF6',
    progress: 30,
    order: 5,
    itemsCount: 4,
    notificationCount: 1,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-18T00:00:00.000Z'
  },
  {
    id: 'type-6',
    name: 'Экономика',
    color: '#06B6D4',
    progress: 55,
    order: 6,
    itemsCount: 10,
    notificationCount: 0,
    createdAt: '2024-01-06T00:00:00.000Z',
    updatedAt: '2024-01-17T00:00:00.000Z'
  }
]
