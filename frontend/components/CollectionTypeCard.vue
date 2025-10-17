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
    
    <!-- Content container with padding -->
    <div class="relative z-20 h-full flex flex-col items-center justify-center p-3">
      <!-- Icon container -->
      <div class="mb-2 flex-shrink-0">
        <div 
          class="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          :style="{ backgroundColor: `${collection.color}20` }"
        >
          <svg 
            class="w-7 h-7 text-white drop-shadow-lg"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>
      
      <!-- Title container -->
      <div class="w-full text-center px-2">
        <h3 
          :class="getTitleClasses()"
          :title="`Length: ${collection.name.length}`"
        >
          {{ processTitle(collection.name) }}
        </h3>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import WaveEffect from './WaveEffect.vue'

// Types
interface CollectionType {
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

interface CollectionTag {
  id: string
  text: string
  bgClass: string
  textClass: string
  borderClass: string
  notificationCount: number
}

// Props
interface Props {
  collection: CollectionType
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
const titleRef = ref<HTMLElement | null>(null)
const fontSize = ref('1.125rem') // Базовый размер шрифта (18px)
const isTextTruncated = ref(false)

// Methods
const getProgressClass = (progress: number) => {
  if (progress >= 100) return 'completed'
  if (progress >= 70) return 'high-progress'
  if (progress >= 40) return 'medium-progress'
  return 'low-progress'
}


// Функция для обработки очень длинных слов без пробелов
const processTitle = (title: string) => {
  // Если слово длиннее 20 символов и не содержит пробелов, вставляем пробелы каждые 15 символов
  if (title.length > 20 && !title.includes(' ')) {
    return title.replace(/(.{15})/g, '$1 ').trim()
  }
  return title
}

// Функция для проверки, помещается ли текст в 2 строки
const checkTextFit = async () => {
  if (!titleRef.value) return
  
  await nextTick()
  
  const element = titleRef.value
  const computedStyle = window.getComputedStyle(element)
  const lineHeight = parseFloat(computedStyle.lineHeight)
  const maxHeight = lineHeight * 2.1 // Небольшой запас для точности
  
  // Сначала сбрасываем обрезание для точной проверки
  isTextTruncated.value = false
  fontSize.value = '1.125rem' // Сбрасываем к базовому размеру (18px)
  
  await nextTick()
  
  // Проверяем, превышает ли высота элемента максимальную высоту для 2 строк
  const isOverflowing = element.scrollHeight > maxHeight
  
  if (isOverflowing) {
    // Пробуем уменьшить размер шрифта поэтапно
    let currentFontSize = 1.125 // Начинаем с базового размера (18px)
    const minFontSize = 0.7 // Минимальный размер (11.2px)
    
    while (currentFontSize > minFontSize && isOverflowing) {
      currentFontSize -= 0.05 // Уменьшаем на 0.05rem за раз
      fontSize.value = `${currentFontSize}rem`
      
      await nextTick()
      
      const stillOverflowing = element.scrollHeight > maxHeight
      if (!stillOverflowing) {
        break
      }
    }
    
    // Если даже с минимальным размером не помещается, включаем обрезание
    if (element.scrollHeight > maxHeight) {
      isTextTruncated.value = true
    }
  }
}

// Функция для получения CSS классов
const getTitleClasses = () => {
  return 'adaptive-title-collection text-white font-semibold drop-shadow-lg leading-tight'
}

const handleCardClick = (event: Event) => {
  emit('cardClick', props.collection.id, event)
}

// Watchers
watch(() => props.collection.name, async () => {
  await nextTick()
  checkTextFit()
}, { immediate: false })

// Lifecycle
onMounted(async () => {
  await nextTick()
  checkTextFit()
})
</script>

<style scoped>
/* Простая карточка без лишних элементов */
</style>
