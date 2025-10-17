<template>
  <div
    @click="handleCardClick"
    :class="[
      'glass-card tetris-card group relative overflow-hidden p-4 cursor-pointer',
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
      
      <!-- Expand/Collapse button in bottom right corner (narrow screens only) -->
      <button 
        v-if="isNarrowScreen"
        @click.stop="toggleCardExpansion"
        class="absolute bottom-0 right-0 z-30 notification-icon"
        :title="isCardExpanded ? 'Свернуть' : 'Развернуть'"
      >
        <svg 
          class="w-4 h-4 transition-all duration-200 text-gray-500"
          :class="{ 'rotate-180': isCardExpanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <!-- Title with reserved space for 2 lines -->
      <div class="mb-2 pr-8 h-12 flex items-start">
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
      
      <!-- Progress tags -->
      <div class="progress-tags-bottom">
        <div class="flex flex-wrap gap-1">
          <!-- Labs tag with dot -->
          <span 
            v-if="subject.totalLabs > 0"
            class="progress-tag bg-blue-500/20 text-blue-300 border-blue-500/30 inline-flex items-center gap-1"
            @click.stop
          >
            {{ subject.completedLabs }}/{{ subject.totalLabs }} лаб
            <div 
              class="w-1.5 h-1.5 rounded-full notification-dot"
              :class="subject.hasLabNotification ? 'bg-red-500' : 'bg-gray-500'"
            ></div>
          </span>
          
          <!-- Attestations tag with dot -->
          <span 
            v-if="subject.totalAttestations > 0"
            class="progress-tag bg-green-500/20 text-green-300 border-green-500/30 inline-flex items-center gap-1"
            @click.stop
          >
            {{ subject.completedAttestations || 0 }}/{{ subject.totalAttestations || 0 }} атт
            <div 
              class="w-1.5 h-1.5 rounded-full notification-dot"
              :class="subject.hasAttestationNotification ? 'bg-red-500' : 'bg-gray-500'"
            ></div>
          </span>
          
          <!-- Courseworks tag with dot -->
          <span 
            v-if="subject.totalCourseworks > 0"
            class="progress-tag bg-purple-500/20 text-purple-300 border-purple-500/30 inline-flex items-center gap-1"
            @click.stop
          >
            {{ subject.completedCourseworks || 0 }}/{{ subject.totalCourseworks || 0 }} курсач
            <div 
              class="w-1.5 h-1.5 rounded-full notification-dot"
              :class="subject.hasCourseworkNotification ? 'bg-red-500' : 'bg-gray-500'"
            ></div>
          </span>
          
          <!-- Add tasks button for empty subjects -->
          <span 
            v-if="subject.totalLabs === 0 && subject.totalAttestations === 0 && subject.totalCourseworks === 0"
            class="progress-tag bg-gray-500/20 text-gray-500 border-gray-500/30 inline-flex items-center gap-1 cursor-pointer hover:bg-gray-500/30 transition-colors"
            @click.stop="addTasksToSubject"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Добавить задачи
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WaveEffect from './WaveEffect.vue'

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
  hasLabNotification: boolean
  hasAttestationNotification: boolean
  hasCourseworkNotification: boolean
  status: 'active' | 'completed' | 'paused'
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
  
  if (length > 120) {
    return 'extremely-long-title'
  } else if (length > 80) {
    return 'very-long-title'
  } else if (length > 50) {
    return 'long-title'
  }
  
  return ''
}

const handleCardClick = (event: Event) => {
  emit('cardClick', props.subject.id, event)
}

const toggleCardExpansion = () => {
  emit('toggleExpansion', props.subject.id)
}

const addTasksToSubject = () => {
  emit('addTasks', props.subject.id)
}
</script>