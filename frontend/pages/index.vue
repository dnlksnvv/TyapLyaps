<template>
  <div @click="handleBackgroundClick">
    <!-- Calendar Task Manager -->
    <div class="h-[calc(100vh-9rem)] flex flex-col parallax-element">
      <!-- Calendar Container -->
      <div class="sm:bg-white/5 sm:backdrop-blur-sm border-0 sm:border border-white/10 rounded-none sm:rounded-2xl p-2 sm:p-6 flex-1 flex flex-col">
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            @click="previousPeriod"
            class="p-2 rounded-lg text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h2 class="text-xl font-semibold text-white">{{ currentPeriodTitle }}</h2>
          
            <button 
            @click="nextPeriod"
            class="p-2 rounded-lg text-white"
            >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
        </div>

        <!-- View Toggle -->
        <div class="flex justify-center mb-6">
          <div class="flex bg-white/10 rounded-lg p-1">
            <button
              v-for="view in views"
              :key="view.value"
              @click="currentView = view.value"
      :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium',
                currentView === view.value
                  ? 'bg-white/20 text-white'
                  : 'text-white/70'
              ]"
            >
              {{ view.label }}
            </button>
          </div>
        </div>

        <!-- Calendar Content -->
        <div class="calendar-content flex-1 overflow-hidden">
          <!-- Day View -->
          <div v-if="currentView === 'day'" class="day-view h-full flex flex-col">
            <div class="text-center mb-4">
              <div class="text-2xl font-bold text-white">{{ currentDate.getDate() }}</div>
              <div class="text-sm text-gray-300">{{ currentDate.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', year: 'numeric' }) }}</div>
        </div>

            <div class="space-y-3 flex-1 overflow-y-auto">
              <div
                v-for="task in getTasksForDate(currentDate)"
                :key="task.id"
                class="p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer"
                @click="selectTask(task)"
              >
                       <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-white">{{ task.title }}</h4>
                    <p class="text-sm text-gray-400">{{ task.description }}</p>
            </div>
                  <div class="flex items-center space-x-2">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    ]">
                      {{ task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий' }}
                    </span>
                    <div v-if="task.completed" class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            </div>
          </div>
        </div>
      </div>
                     </div>
                     
          <!-- Week View -->
          <div v-else-if="currentView === 'week'" class="week-view h-full flex flex-col">
            <div class="grid grid-cols-7 gap-2 mb-4">
              <div
                v-for="day in weekDays"
                :key="day.date.toISOString()"
                class="text-center p-2"
              >
                <div class="text-sm text-gray-400">{{ day.name }}</div>
                <div :class="[
                  'text-lg font-semibold rounded-full w-8 h-8 flex items-center justify-center mx-auto',
                  isToday(day.date) ? 'bg-blue-500 text-white' : 'text-white'
                ]">
                  {{ day.date.getDate() }}
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-7 gap-2 flex-1">
              <div
                v-for="day in weekDays"
                :key="day.date.toISOString()"
                class="p-2 bg-white/5 rounded-lg overflow-y-auto"
              >
                <div
                  v-for="task in getTasksForDate(day.date)"
                  :key="task.id"
                  class="text-xs p-1 mb-1 bg-blue-500/20 text-blue-300 rounded truncate cursor-pointer"
                  @click="selectTask(task)"
                >
                  {{ task.title }}
              </div>
            </div>
          </div>
        </div>
        
          <!-- Month View -->
          <div v-else-if="currentView === 'month'" class="month-view h-full flex flex-col">
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div
                v-for="dayName in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']"
                :key="dayName"
                class="text-center text-sm text-gray-400 py-2"
              >
                {{ dayName }}
          </div>
            </div>
            
            <div class="grid grid-cols-7 gap-1 flex-1">
              <div
                v-for="day in monthDays"
                :key="day.date.toISOString()"
                :class="[
                  'p-2 rounded-lg cursor-pointer flex flex-col',
                  day.isCurrentMonth ? 'bg-white/5' : 'bg-white/2',
                  isToday(day.date) ? 'ring-2 ring-blue-500' : ''
                ]"
                @click="selectDate(day.date)"
              >
                <div :class="[
                  'text-sm font-medium mb-1',
                  day.isCurrentMonth ? 'text-white' : 'text-gray-500',
                  isToday(day.date) ? 'text-blue-300' : ''
                ]">
                  {{ day.date.getDate() }}
                </div>
                
                <div class="space-y-1 flex-1 overflow-y-auto">
                  <div
                    v-for="task in getTasksForDate(day.date).slice(0, 2)"
                    :key="task.id"
                  :class="[
                      'text-xs p-1 rounded truncate',
                      task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    ]"
                    @click.stop="selectTask(task)"
                  >
                    {{ task.title }}
                  </div>
                  <div v-if="getTasksForDate(day.date).length > 2" class="text-xs text-gray-400">
                    +{{ getTasksForDate(day.date).length - 2 }} еще
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Use default layout
definePageMeta({
  layout: 'default'
})

import { ref, computed } from 'vue'

// Task interface
interface Task {
  id: string
  title: string
  description: string
  date: Date
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  category: string
}

// Calendar state
const currentView = ref<'day' | 'week' | 'month'>('month')
const currentDate = ref(new Date())

// View options
const views = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' }
]

// Mock tasks data
const tasks = ref<Task[]>([
  {
    id: '1',
    title: 'Изучить Vue.js',
    description: 'Пройти курс по Vue.js и изучить основы',
    date: new Date(2024, 11, 20),
    priority: 'high',
    completed: false,
    category: 'Обучение'
  },
  {
    id: '2',
    title: 'Сделать проект',
    description: 'Создать финальный проект для портфолио',
    date: new Date(2024, 11, 22),
    priority: 'high',
    completed: false,
    category: 'Проекты'
  },
  {
    id: '3',
    title: 'Встреча с командой',
    description: 'Еженедельная встреча с командой разработки',
    date: new Date(2024, 11, 18),
    priority: 'medium',
    completed: true,
    category: 'Работа'
  },
  {
    id: '4',
    title: 'Покупки',
    description: 'Купить продукты на неделю',
    date: new Date(2024, 11, 19),
    priority: 'low',
    completed: false,
    category: 'Личное'
  },
  {
    id: '5',
    title: 'Спорт',
    description: 'Тренировка в спортзале',
    date: new Date(2024, 11, 21),
    priority: 'medium',
    completed: false,
    category: 'Здоровье'
  },
  {
    id: '6',
    title: 'Чтение книги',
    description: 'Прочитать главу из книги по программированию',
    date: new Date(2024, 11, 23),
    priority: 'low',
    completed: false,
    category: 'Обучение'
  },
  {
    id: '7',
    title: 'Дедлайн проекта',
    description: 'Сдать финальную версию проекта',
    date: new Date(2024, 11, 25),
    priority: 'high',
    completed: false,
    category: 'Проекты'
  }
])

// Computed properties (removed unused stats)

const currentPeriodTitle = computed(() => {
  if (currentView.value === 'day') {
    return currentDate.value.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  } else if (currentView.value === 'week') {
    const startOfWeek = getStartOfWeek(currentDate.value)
    const endOfWeek = getEndOfWeek(currentDate.value)
    return `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}`
  } else {
    return currentDate.value.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
  }
})

const weekDays = computed(() => {
  const startOfWeek = getStartOfWeek(currentDate.value)
  const days = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    days.push({
      date,
      name: date.toLocaleDateString('ru-RU', { weekday: 'short' })
    })
  }
  
  return days
})

const monthDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = getStartOfWeek(firstDay)
  
  const days = []
  const current = new Date(startDate)
  
  for (let i = 0; i < 42; i++) {
    days.push({
      date: new Date(current),
      isCurrentMonth: current.getMonth() === month
    })
    current.setDate(current.getDate() + 1)
  }
  
  return days
})

// Helper functions
const getStartOfWeek = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

const getEndOfWeek = (date: Date) => {
  const start = getStartOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return end
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const getTasksForDate = (date: Date) => {
  return tasks.value.filter(task => 
    task.date.toDateString() === date.toDateString()
  )
}

// Calendar navigation
const previousPeriod = () => {
  if (currentView.value === 'day') {
    currentDate.value.setDate(currentDate.value.getDate() - 1)
  } else if (currentView.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() - 7)
  } else {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  }
}

const nextPeriod = () => {
  if (currentView.value === 'day') {
    currentDate.value.setDate(currentDate.value.getDate() + 1)
  } else if (currentView.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() + 7)
  } else {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  }
}

const selectDate = (date: Date) => {
  currentDate.value = new Date(date)
  currentView.value = 'day'
}

const selectTask = (task: Task) => {
  console.log('Selected task:', task)
  // TODO: Open task details modal
}

// Handle background click
const handleBackgroundClick = (event: Event) => {
  // Handle any background clicks if needed
}
</script>

<style scoped>
/* Page specific styles */
html, body {
  overflow: hidden;
  height: 100vh;
  max-height: 100vh;
}

/* Calendar container styles */

/* Ensure calendar takes full height without scrolling */
.calendar-content {
  height: 100%;
}

/* Disable any glass effects on calendar */
.parallax-element {
  transform: none !important;
}

.parallax-element:hover {
  transform: none !important;
}

/* Remove all margins and padding on mobile */
@media (max-width: 640px) {
  .parallax-element {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .glass-card {
    margin: 0 !important;
    border-radius: 0 !important;
  }
}
</style>