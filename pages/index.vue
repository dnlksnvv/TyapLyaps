<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="glass-header sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold gradient-text">
                TyapLyaps
              </h1>
            </div>
          </div>
          
          <!-- User menu -->
          <div class="flex items-center space-x-4">
            <!-- Mobile menu button -->
            <button 
              @click="toggleMobileMenu"
              class="lg:hidden p-2 rounded-lg glass-effect text-white hover:bg-white/10 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-sm font-bold text-white">С</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar Menu -->
    <aside 
      :class="[
        'glass-card sidebar-menu p-6 parallax-element',
        'fixed left-0 top-24 z-40 transform transition-transform duration-300 ease-in-out',
        'lg:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <nav class="space-y-4">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-white mb-2">Меню</h2>
        </div>
        
        <a href="#" @click="closeMobileMenu" class="menu-item flex items-center space-x-3 p-3 rounded-lg">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
          <span class="text-gray-300">Дашборд</span>
        </a>
        
        <a href="#" @click="closeMobileMenu" class="menu-item flex items-center space-x-3 p-3 rounded-lg">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-gray-300">Предметы</span>
        </a>
        
        <a href="#" @click="closeMobileMenu" class="menu-item flex items-center space-x-3 p-3 rounded-lg">
          <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-gray-300">Расписание</span>
        </a>
        
        <a href="#" @click="closeMobileMenu" class="menu-item flex items-center space-x-3 p-3 rounded-lg">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="text-gray-300">Статистика</span>
        </a>
        
        <a href="#" @click="closeMobileMenu" class="menu-item flex items-center space-x-3 p-3 rounded-lg">
          <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-gray-300">Настройки</span>
        </a>
      </nav>
    </aside>

    <!-- Mobile menu overlay -->
    <div 
      v-if="isMobileMenuOpen"
      @click="closeMobileMenu"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
    ></div>

    <!-- Scrollable Content Area -->
    <div class="scrollable-content">
      <main class="px-4 sm:px-6 lg:px-8 py-8 lg:ml-72">

                   <!-- Stats Overview -->
                   <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8 parallax-element">                     <div class="glass-card group relative overflow-hidden p-4">
                       <div class="flex items-center justify-between">
                         <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="text-right">
              <h3 class="text-xl font-bold text-white">{{ progressStats.totalSubjects }}</h3>
              <p class="text-xs text-gray-300">Всего предметов</p>
            </div>
          </div>
        </div>

                     <div class="glass-card group relative overflow-hidden p-4">
                       <div class="flex items-center justify-between">
                         <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-right">
              <h3 class="text-xl font-bold text-white">{{ progressStats.completedSubjects }}</h3>
              <p class="text-xs text-gray-300">Завершено</p>
            </div>
          </div>
        </div>

                     <div class="glass-card group relative overflow-hidden p-4">
                       <div class="flex items-center justify-between">
                         <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20">
              <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-right">
              <h3 class="text-xl font-bold text-white">{{ progressStats.thisWeekLabs }}</h3>
              <p class="text-xs text-gray-300">Лабы на неделе</p>
            </div>
          </div>
        </div>

                     <div class="glass-card group relative overflow-hidden p-4">
                       <div class="flex items-center justify-between">
                         <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="text-right">
              <h3 class="text-xl font-bold text-white">{{ progressStats.overallProgress }}%</h3>
              <p class="text-xs text-gray-300">Общий прогресс</p>
            </div>
          </div>
        </div>
      </div>

                   <!-- All Subjects -->
                   <div class="mb-8 parallax-element">
                     <div class="flex items-center justify-between mb-4">
                       <h3 class="text-xl font-semibold text-white">Все предметы</h3>
                     </div>
                     
                     <div class="tetris-grid">
                       <div
                         v-for="subject in subjects"
                         :key="subject.id"
                         :class="[
                           'glass-card tetris-card group relative overflow-hidden p-4',
                           getProgressClass(subject.currentProgress)
                         ]"
                       >
            <!-- Water effect -->
            <div class="water-container">
              <div 
                class="water-level"
                :style="{ height: `${subject.currentProgress}%` }"
              >
                <!-- Dynamic fill background -->
                <div 
                  class="water-fill"
                  :style="{ backgroundColor: getWaveColor(subject.currentProgress) }"
                ></div>
                
                <!-- SVG with wave on top -->
                <svg class="wave-svg" viewBox="0 -50 100 70" preserveAspectRatio="none">
                  <path 
                    class="sine-wave-fill"
                    :d="generateRealTimeWave(subject.currentProgress)"
                    :fill="getWaveColor(subject.currentProgress)"
                  />
                </svg>
              </div>
            </div>
            
            <!-- Background gradient -->
            <div 
              class="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10 z-10"
              :style="{ background: `linear-gradient(135deg, ${subject.color}20, ${subject.color}40)` }"
            />
            
            <!-- Header -->
            <div class="relative z-20">
              <!-- Title with reserved space for 2 lines -->
              <div class="mb-3">
                <h3 
                  :class="[
                    'adaptive-title text-xl font-semibold text-white drop-shadow-lg',
                    getTitleClass(subject.name)
                  ]"
                >
                  {{ subject.name }}
                </h3>
              </div>
              
              <!-- Professor moved below title -->
              <div class="flex items-center text-sm mb-4 text-gray-300 drop-shadow-md">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ subject.professor }}
              </div>
              
              <!-- Progress percentage and notification icon -->
              <div class="flex items-center justify-between mb-3">
                <!-- Progress percentage -->
                <div class="text-left">
                  <span class="text-lg font-bold text-white drop-shadow-lg">{{ subject.currentProgress }}%</span>
                </div>
                
                <!-- Notification icon -->
                <div class="relative notification-icon">
                  <svg 
                    class="w-5 h-5 transition-colors duration-200"
                    :class="subject.hasNotification ? 'text-white' : 'text-gray-500'"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  
                  <!-- Red dot for notifications -->
                  <div 
                    v-if="subject.hasNotification"
                    class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full notification-dot"
                  ></div>
                </div>
              </div>
              
              <!-- Progress tags -->
              <div class="progress-tags">
                <span class="progress-tag bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {{ subject.completedLabs }}/{{ subject.totalLabs }} лаб
                </span>
                <span class="progress-tag bg-green-500/20 text-green-300 border-green-500/30">
                  {{ subject.completedAttestations || 0 }}/{{ subject.totalAttestations || 0 }} атт
                </span>
                <span class="progress-tag bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {{ subject.completedCourseworks || 0 }}/{{ subject.totalCourseworks || 0 }} курсач
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Types
interface Subject {
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
  status: 'active' | 'completed' | 'paused'
}

interface User {
  id: string
  name: string
  email: string
  semester: string
  year: number
  university: string
}

interface ProgressStats {
  totalSubjects: number
  completedSubjects: number
  totalLabs: number
  completedLabs: number
  overallProgress: number
  thisWeekLabs: number
}

// Reactive data
const subjects = ref<Subject[]>([])
const user = ref<User | null>(null)

// Computed
const progressStats = computed((): ProgressStats => {
  const totalSubjects = subjects.value.length
  const completedSubjects = subjects.value.filter(s => s.status === 'completed').length
  
  const totalLabs = subjects.value.reduce((acc, subject) => 
    acc + subject.totalLabs, 0
  )
  const completedLabs = subjects.value.reduce((acc, subject) => 
    acc + subject.completedLabs, 0
  )
  
  const overallProgress = totalSubjects > 0 
    ? Math.round((completedSubjects / totalSubjects) * 100)
    : 0
  
  // Get labs due this week
  const now = new Date()
  const weekEnd = new Date(now)
  weekEnd.setDate(weekEnd.getDate() + 7)
  
  const thisWeekLabs = subjects.value.reduce((acc, subject) => {
    return acc + subject.totalLabs // Simplified for demo
  }, 0)
  
  return {
    totalSubjects,
    completedSubjects,
    totalLabs,
    completedLabs,
    overallProgress,
    thisWeekLabs
  }
})

// Methods
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Доброе утро!'
  if (hour < 18) return 'Добрый день!'
  return 'Добрый вечер!'
}

const getDifficultyText = (difficulty: string) => {
  const difficultyMap = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно'
  }
  return difficultyMap[difficulty as keyof typeof difficultyMap] || difficulty
}

const getProgressClass = (progress: number) => {
  if (progress >= 100) return 'completed'
  if (progress >= 70) return 'high-progress'
  if (progress >= 40) return 'medium-progress'
  return 'low-progress'
}

const generateSineWave = (progress: number) => {
  // Чем меньше прогресс, тем больше амплитуда и частота
  const amplitude = Math.max(2, 2 + (100 - progress) / 100 * 6) // от 8 до 2
  const frequency = 1 + (100 - progress) / 100 * 2 // от 3 до 1
  const centerY = 10
  
  let path = `M0,${centerY}`
  
  for (let x = 0; x <= 200; x += 2) {
    const y = centerY + Math.sin((x / 200) * Math.PI * 2 * frequency) * amplitude
    path += ` L${x},${y}`
  }
  
  return path
}

const generateWaveFill = (progress: number) => {
  // Чем меньше прогресс, тем больше амплитуда и частота
  const amplitude = Math.max(2, 2 + (100 - progress) / 100 * 6) // от 8 до 2
  const frequency = 1 + (100 - progress) / 100 * 2 // от 3 до 1
  const centerY = 10
  const bottomY = 20 // низ области
  const width = 100 // ширина блока
  
  // Начинаем с левого нижнего угла
  let path = `M0,${bottomY}`
  
  // Идем по волне слева направо в пределах блока
  for (let x = 0; x <= width; x += 1) {
    const y = centerY + Math.sin((x / width) * Math.PI * 2 * frequency) * amplitude
    path += ` L${x},${y}`
  }
  
  // Закрываем область справа вниз
  path += ` L${width},${bottomY}`
  
  // Закрываем область слева вверх
  path += ` Z`
  
  return path
}

const generateInfiniteWave = (progress: number) => {
  // Чем меньше прогресс, тем больше амплитуда и частота
  const amplitude = Math.max(2, 2 + (100 - progress) / 100 * 6) // от 8 до 2
  const frequency = 1 + (100 - progress) / 100 * 2 // от 3 до 1
  const centerY = 10
  const bottomY = 20 // низ области
  const width = 200 // двойная ширина для бесконечности
  
  // Начинаем с левого нижнего угла
  let path = `M0,${bottomY}`
  
  // Идем по волне слева направо (двойная ширина)
  for (let x = 0; x <= width; x += 1) {
    const y = centerY + Math.sin((x / 100) * Math.PI * 2 * frequency) * amplitude
    path += ` L${x},${y}`
  }
  
  // Закрываем область справа вниз
  path += ` L${width},${bottomY}`
  
  // Закрываем область слева вверх
  path += ` Z`
  
  return path
}

const getWaveDuration = (progress: number) => {
  // Чем меньше прогресс, тем быстрее волна
  return 2 + (100 - progress) / 100 * 2 // от 4 до 2 секунд
}

// Реактивная переменная для времени
const waveTime = ref(0)

// Обновляем время для анимации
onMounted(() => {
  const updateWave = () => {
    waveTime.value = Date.now() / 1000
    requestAnimationFrame(updateWave)
  }
  updateWave()
})

const generateRealTimeWave = (progress: number) => {
  // Чем меньше прогресс, тем больше амплитуда и больше гармоник
  const baseAmplitude = Math.max(1, 1 + (100 - progress) / 100 * 8) // от 9 до 1
  const baseFrequency = 1 + (100 - progress) / 100 * 4 // от 5 до 1
  const speed = 2 + (100 - progress) / 100 * 1 // скорость волны
  const width = 100 // ширина блока
  const height = 20 // высота SVG
  const centerY = -20 // центр волны поднят вверх
  
  // Количество гармоник зависит от прогресса (меньше прогресс = больше гармоник)
  const numHarmonics = Math.max(1, Math.floor(1 + (100 - progress) / 100 * 14)) // от 15 до 1
  
  // Динамический цвет на основе прогресса
  const red = Math.floor(255 * (100 - progress) / 100) // от 255 до 0
  const green = Math.floor(255 * progress / 100) // от 0 до 255
  const blue = Math.floor(100 + (100 - progress) / 100 * 50) // от 150 до 100
  const color = `rgb(${red}, ${green}, ${blue})`
  
  // Начинаем с левого нижнего угла
  let path = `M0,${height}`
  
  // Генерируем полигармоническую волну в реальном времени
  for (let x = 0; x <= width; x += 1) {
    const time = waveTime.value * speed
    let y = centerY
    
    // Складываем несколько гармоник
    for (let h = 1; h <= numHarmonics; h++) {
      const harmonicAmplitude = baseAmplitude / h // амплитуда убывает с номером гармоники
      const harmonicFrequency = baseFrequency * h // частота растет с номером гармоники
      
      // Детерминированная фаза для каждой гармоники (не случайная)
      const phaseOffset = h * 0.5 // каждая гармоника имеет свою фазу
      const phase = (x / width) * Math.PI * 2 * harmonicFrequency + time + phaseOffset
      
      // Используем разные функции для разных гармоник
      let waveValue = 0
      if (h % 4 === 1) {
        waveValue = Math.sin(phase)
      } else if (h % 4 === 2) {
        waveValue = Math.cos(phase)
      } else if (h % 4 === 3) {
        waveValue = Math.sin(phase) * Math.cos(phase)
      } else {
        waveValue = Math.sin(phase) + Math.cos(phase * 1.5)
      }
      
      // Добавляем детерминированный шум (на основе позиции и времени)
      const noisePhase = (x / width) * Math.PI * 4 + time * 2
      const noise = (100 - progress) / 100 * Math.sin(noisePhase) * 0.5
      
      y += waveValue * harmonicAmplitude + noise
    }
    
    path += ` L${x},${y}`
  }
  
  // Закрываем область справа вниз
  path += ` L${width},${height}`
  
  // Закрываем область слева вверх
  path += ` Z`
  
  return path
}

const getWaveColor = (progress: number) => {
  // Динамический цвет на основе прогресса
  // 0% = яркий красный, 50% = яркий желтый, 100% = яркий зеленый
  let red, green, blue
  
  if (progress <= 50) {
    // От яркого красного к яркому желтому (0-50%)
    const ratio = progress / 50
    red = 255
    green = Math.floor(255 * ratio) // от 0 до 255
    blue = 0
  } else {
    // От яркого желтого к яркому зеленому (50-100%)
    const ratio = (progress - 50) / 50
    red = Math.floor(255 * (1 - ratio)) // от 255 до 0
    green = 255
    blue = 0
  }
  
  const alpha = 0.2
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const getTitleClass = (title: string) => {
  const length = title.length
  
  if (length > 120) {
    return 'extremely-long-title'
  } else if (length > 80) {
    return 'very-long-title'
  } else if (length > 50) {
    return 'long-title'
  }
  
  return ''
}

const loadMockData = () => {
  subjects.value = [
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
      status: 'active'
    }
  ]
  
  user.value = {
    id: '1',
    name: 'Студент',
    email: 'student@university.edu',
    semester: 'Осенний 2024',
    year: 2,
    university: 'Университет'
  }
}

// Lifecycle
onMounted(() => {
  loadMockData()
})
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #f0f6fc 0%, #8b949e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>