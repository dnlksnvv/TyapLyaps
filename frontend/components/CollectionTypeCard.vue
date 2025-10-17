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
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
