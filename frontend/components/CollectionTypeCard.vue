<template>
  <div
    @click="handleCardClick"
    :class="[
      'glass-card tetris-card collection-type group relative overflow-hidden cursor-pointer touch-manipulation',
      getProgressClass(collection.progress),
      { 'expanded': isCardExpanded }
    ]"
  >
    <!-- Water effect -->
    <WaveEffect :progress="collection.progress" />
    
    <!-- Background gradient -->
    <div 
      class="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10 z-10"
      :style="{ background: `linear-gradient(135deg, ${collection.color}20, ${collection.color}40)` }"
    />
    
    <!-- Main content container with padding from card edges -->
    <div class="relative z-20 h-full flex flex-col p-4">
      <!-- Notification icon in top right corner -->
      <div class="absolute top-2 right-2 z-30 notification-icon" @click.stop>
        <svg 
          class="w-4 h-4 transition-colors duration-200"
          :class="collection.hasNotification ? 'text-white' : 'text-gray-500'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        <!-- Red dot for notifications -->
        <div 
          v-if="collection.hasNotification"
          class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full notification-dot"
        ></div>
      </div>
      
      <!-- Content container (icon + text) with proper spacing -->
      <div class="flex-1 flex flex-col items-center justify-center">
        <!-- Icon container -->
        <div class="flex justify-center items-center h-16 mb-3">
          <div class="w-12 h-12 rounded-full flex items-center justify-center"
               :style="{ backgroundColor: collection.color + '20' }">
            <svg 
              class="w-6 h-6 transition-colors duration-200"
              :style="{ color: collection.color }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        
        <!-- Text container with width constraint -->
        <div class="w-full text-center" style="max-width: 100%; overflow: hidden; box-sizing: border-box;">
          <h3 
            :class="[
              'adaptive-title text-sm font-semibold text-white drop-shadow-lg',
              getTitleClass(collection.name)
            ]"
            style="max-width: 100% !important; width: 100% !important; box-sizing: border-box !important; word-wrap: break-word !important; overflow-wrap: break-word !important; white-space: normal !important; word-break: break-word !important; overflow: hidden !important;"
          >
            {{ collection.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WaveEffect from './WaveEffect.vue'

// Types
interface Collection {
  id: string
  name: string
  content: string
  description: string
  color: string
  progress: number
  itemsCount: number
  parentId?: string
  type: 'collection' | 'task'
  hasNotification?: boolean
  tags?: CollectionTag[]
  createdAt: string
  updatedAt: string
}

interface CollectionTag {
  id: string
  text: string
  bgClass: string
  textClass: string
  borderClass: string
  hasNotification: boolean
}

// Props
interface Props {
  collection: Collection
  isExpanded?: boolean
  isNarrowScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: false,
  isNarrowScreen: false
})

// Emits
const emit = defineEmits<{
  cardClick: [collectionId: string, event: Event]
  toggleExpansion: [collectionId: string]
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
  emit('cardClick', props.collection.id, event)
}
</script>

<style scoped>
/* Component specific styles */
</style>
