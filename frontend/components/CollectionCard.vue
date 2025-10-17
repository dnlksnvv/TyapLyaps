<template>
  <div
    @click="handleCardClick"
    :class="[
      'glass-card tetris-card group relative overflow-hidden p-4 cursor-pointer touch-manipulation',
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
    
    <!-- Header -->
    <div class="relative z-20">
      <!-- Notification icon in top right corner -->
      <div class="absolute top-0 right-0 z-30 notification-icon" @click.stop>
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
      
      <!-- Expand/Collapse button in bottom right corner -->
      <button 
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
      <div class="mb-1 pr-8 h-12 flex items-start">
        <h3 
          :class="[
            'adaptive-title text-xl font-semibold text-white drop-shadow-lg',
            getTitleClass(collection.name)
          ]"
        >
          {{ collection.name }}
        </h3>
      </div>
      
      <!-- Description and Content - Compact -->
      <div class="mb-2 pr-8">
        <div class="flex items-center text-xs mb-1 text-gray-400 drop-shadow-md">
          <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="truncate">{{ collection.description }}</span>
        </div>
        
        <div class="flex items-center text-xs text-gray-300 drop-shadow-md">
          <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span class="truncate">{{ collection.content }}</span>
        </div>
      </div>
      
      <!-- Progress tags -->
      <div class="progress-tags-bottom">
        <div class="flex flex-wrap gap-1">
          <!-- Dynamic tags from collection items -->
          <span 
            v-for="tag in collection.tags"
            :key="tag.id"
            :class="[
              'progress-tag inline-flex items-center gap-1',
              tag.bgClass,
              tag.textClass,
              tag.borderClass
            ]"
            @click.stop
          >
            {{ tag.text }}
            <div 
              v-if="tag.hasNotification"
              class="w-1.5 h-1.5 rounded-full bg-red-500 notification-dot"
            ></div>
          </span>
          
          <!-- Fallback if no tags -->
          <span 
            v-if="!collection.tags || collection.tags.length === 0"
            class="progress-tag bg-gray-500/20 text-gray-500 border-gray-500/30 inline-flex items-center gap-1"
            @click.stop
          >
            {{ collection.itemsCount }} предметов
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
interface Collection {
  id: string
  name: string
  description: string
  color: string
  progress: number
  itemsCount: number
  createdAt: string
  updatedAt: string
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
  emit('cardClick', props.collection.id, event)
}

const toggleCardExpansion = () => {
  emit('toggleExpansion', props.collection.id)
}
</script>
