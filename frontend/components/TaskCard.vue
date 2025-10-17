<template>
  <div
    @click="handleCardClick"
    :class="[
      'glass-card tetris-card group relative overflow-hidden p-4 cursor-pointer touch-manipulation',
      getProgressClass(task.progress),
      { 'expanded': isCardExpanded }
    ]"
  >
    <!-- Water effect -->
    <WaveEffect :progress="task.progress" />
    
    <!-- Background gradient -->
    <div 
      class="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10 z-10"
      :style="{ background: `linear-gradient(135deg, ${task.color}20, ${task.color}40)` }"
    />
    
    <!-- Header -->
    <div class="relative z-20">
    <!-- Notification icon in top right corner -->
    <div class="absolute top-0 right-0 z-30 notification-icon" @click.stop>
        <svg 
          class="w-4 h-4 transition-colors duration-200"
          :class="(task.notificationCount || 0) > 0 ? 'text-white' : 'text-gray-500'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        <!-- Red dot for notifications -->
        <div 
          v-if="(task.notificationCount || 0) > 0"
          class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full notification-dot"
        ></div>
      </div>
      
      
      <!-- Title with reserved space for 2 lines -->
      <div class="mb-2 pr-6 h-12 flex items-start">
        <h3 
          :class="[
            'adaptive-title text-xl font-semibold text-white drop-shadow-lg',
            getTitleClass(task.name)
          ]"
        >
          {{ task.name }}
        </h3>
      </div>
      
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WaveEffect from './WaveEffect.vue'

// Types
interface Task {
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
  hasLabNotification: boolean
  hasAttestationNotification: boolean
  hasCourseworkNotification: boolean
  status: 'active' | 'completed' | 'paused'
  createdAt: string
  updatedAt: string
}

// Props
interface Props {
  task: Task
  isExpanded?: boolean
  isNarrowScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: false,
  isNarrowScreen: false
})

// Emits
const emit = defineEmits<{
  cardClick: [taskId: string, event: Event]
  toggleExpansion: [taskId: string]
  addTasks: [taskId: string]
}>()

// Reactive data
const waveTime = ref(0)

// Computed
const isCardExpanded = computed(() => props.isExpanded)

// Methods
const getProgressClass = (progress: number) => {
  if (progress >= 100) return 'completed'
  if (progress >= 70) return 'high-progress'
  if (progress >= 40) return 'medium-progress'
  return 'low-progress'
}

const getTitleClass = (title: string) => {
  const length = title.length
  
  if (length > 150) {
    return 'extremely-long-title'
  } else if (length > 100) {
    return 'very-long-title'
  } else if (length > 60) {
    return 'long-title'
  }
  
  return ''
}

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

const handleCardClick = (event: Event) => {
  emit('cardClick', props.task.id, event)
}

const toggleCardExpansion = () => {
  emit('toggleExpansion', props.task.id)
}

const addTasksToTask = () => {
  emit('addTasks', props.task.id)
}

// Lifecycle
onMounted(() => {
  const updateWave = () => {
    waveTime.value = Date.now() / 1000
    requestAnimationFrame(updateWave)
  }
  updateWave()
})
</script>
