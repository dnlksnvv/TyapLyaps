<template>
  <div
    @click="handleCardClick"
    :class="[
      'glass-card tetris-card group relative overflow-hidden p-4 cursor-pointer touch-manipulation',
      getProgressClass(subject.currentProgress),
      { 'expanded': isCardExpanded }
    ]"
  >
    <!-- Water effect -->
    <WaveEffect :progress="subject.currentProgress" />
    
    <!-- Background gradient -->
    <div 
      class="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10 z-10"
      :style="{ background: `linear-gradient(135deg, ${subject.color}20, ${subject.color}40)` }"
    />
    
    <!-- Header -->
    <div class="relative z-20">
    <!-- Notification icon in top right corner -->
    <div class="absolute top-0 right-0 z-30 notification-icon" @click.stop>
        <svg 
          class="w-4 h-4 transition-colors duration-200"
          :class="(subject.notificationCount || 0) > 0 ? 'text-white' : 'text-gray-500'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        <!-- Red dot for notifications -->
        <div 
          v-if="(subject.notificationCount || 0) > 0"
          class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full notification-dot"
        ></div>
      </div>
      
      
      <!-- Title with reserved space for 2 lines -->
      <div class="mb-1 pr-6 h-12 flex items-start">
        <h3 
          :class="[
            'adaptive-title text-xl font-semibold text-white drop-shadow-lg',
            getTitleClass(subject.name)
          ]"
        >
          {{ subject.name }}
        </h3>
      </div>
      
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WaveEffect from './WaveEffect.vue'

// Types
interface SubjectTag {
  id: string
  text: string
  total: number
  completed: number
  bgClass: string
  textClass: string
  borderClass: string
  notificationCount: number
}

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
  notificationCount: number
  hasLabNotification: boolean
  hasAttestationNotification: boolean
  hasCourseworkNotification: boolean
  status: 'active' | 'completed' | 'paused'
  tags?: SubjectTag[]
}

// Props
interface Props {
  subject: Subject
  isExpanded?: boolean
  isNarrowScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: false,
  isNarrowScreen: false
})

// Emits
const emit = defineEmits<{
  cardClick: [subjectId: string, event: Event]
  toggleExpansion: [subjectId: string]
  addTasks: [subjectId: string]
}>()

// Reactive data
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

const handleCardClick = (event: Event) => {
  emit('cardClick', props.subject.id, event)
}

const addTasksToSubject = () => {
  emit('addTasks', props.subject.id)
}
</script>

<style scoped>
/* Component specific styles */
</style>