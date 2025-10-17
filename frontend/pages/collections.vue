<template>
  <div @click="handleBackgroundClick">
    <!-- Stats Overview -->
    <div class="px-4 sm:px-6 lg:px-8 mb-8">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 parallax-element">
        <StatsCard
          :value="collections.length"
          label="Всего коллекций"
          icon="subjects"
        />
        
        <StatsCard
          :value="completedCollections"
          label="Завершено"
          icon="completed"
        />
        
        <StatsCard
          :value="totalItems"
          label="Всего предметов"
          icon="labs"
        />
        
        <StatsCard
          :value="overallProgress"
          label="Общий прогресс"
          icon="progress"
        />
      </div>
    </div>

    <!-- Collections Grid -->
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="tetris-grid parallax-element">
        <CollectionCard
          v-for="collection in collections"
          :key="collection.id"
          :collection="collection"
          :is-expanded="isCardExpanded(collection.id)"
          :is-narrow-screen="isNarrowScreen"
          @card-click="handleCardClick"
          @toggle-expansion="toggleCardExpansion"
        />
      </div>
      
      <!-- Add Collection Button / Creation Card -->
      <AddCollectionCard
        :is-creating="isCreatingCollection"
        :current-step="currentStep"
        :current-field-value="currentFieldValue"
        @card-click="addNewCollection"
        @next-step="nextStep"
        @previous-step="previousStep"
        @update-field-value="(value) => currentFieldValue = value"
      />
    </div>

    <!-- Collection Types Grid (Square Cards) -->
    <div class="px-4 sm:px-6 lg:px-8 mt-8">
      <h2 class="text-2xl font-bold text-white mb-6 parallax-element">Типы коллекций</h2>
      <div class="square-grid parallax-element" :style="squareGridStyle">
        <CollectionTypeCard
          v-for="collectionType in collectionTypes"
          :key="collectionType.id"
          :collection="collectionType"
          :is-expanded="isCardExpanded(collectionType.id)"
          :is-narrow-screen="isNarrowScreen"
          @card-click="handleCollectionTypeClick"
          @toggle-expansion="toggleCardExpansion"
        />
      </div>
    </div>
    
    <!-- Bottom spacing -->
    <div class="h-8"></div>
  </div>
</template>

<script setup lang="ts">
// Use default layout
definePageMeta({
  layout: 'default'
})

import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import StatsCard from '~/components/StatsCard.vue'
import CollectionCard from '~/components/CollectionCard.vue'
import CollectionTypeCard from '~/components/CollectionTypeCard.vue'
import AddCollectionCard from '~/components/AddCollectionCard.vue'
import { mockCollections, mockCollectionTypes, type Collection, type CollectionType } from '~/data/mockData'

// Data
const collections = ref<Collection[]>([])

// Square collection types data
const collectionTypes = ref<CollectionType[]>([])

// Collection creation state
const isCreatingCollection = ref(false)
const currentStep = ref(0)
const currentFieldValue = ref('')
const newCollection = ref({
  name: '',
  content: '',
  description: ''
})

// Expanded cards state
const expandedCards = ref<Set<string>>(new Set())

// Screen size state
const isNarrowScreen = ref(false)

// Grid calculation for square cards
const squareGridStyle = ref('')


// Computed properties
const completedCollections = computed(() => {
  return collections.value.filter(collection => collection.progress === 100).length
})

const totalItems = computed(() => {
  return collections.value.reduce((total, collection) => total + collection.itemsCount, 0)
})

const overallProgress = computed(() => {
  if (collections.value.length === 0) return 0
  const totalProgress = collections.value.reduce((sum, collection) => sum + collection.progress, 0)
  return Math.round(totalProgress / collections.value.length)
})

// Card expansion functions
const isCardExpanded = (cardId: string) => {
  return expandedCards.value.has(cardId)
}

const toggleCardExpansion = (cardId: string) => {
  if (expandedCards.value.has(cardId)) {
    expandedCards.value.delete(cardId)
  } else {
    expandedCards.value.add(cardId)
  }
}

// Handle card click based on card state
const handleCardClick = (collectionId: string, event: Event) => {
  // Close creation form if open
  if (isCreatingCollection.value) {
    cancelCreateCollection()
  }
  
  if (isNarrowScreen.value) {
    // On narrow screens: close all other cards first, then toggle current
    if (!isCardExpanded(collectionId)) {
      console.log('Expanding card')
      // Close all other cards first
      expandedCards.value.clear()
      // Then expand current card
      toggleCardExpansion(collectionId)
    } else {
      console.log('Navigating to collection page (expanded card)')
      // Navigate to collection page
      window.location.href = `/collections/${collectionId}`
    }
  } else {
    // On wide screens: always navigate
    console.log('Navigating to collection page')
    window.location.href = `/collections/${collectionId}`
  }
}

// Handle collection type card click
const handleCollectionTypeClick = (collectionTypeId: string, event: Event) => {
  console.log('Collection type clicked:', collectionTypeId)
  // Here you can add navigation to a specific collection type page
  // For now, just log the click
}

// Collection creation functions
const addNewCollection = () => {
  isCreatingCollection.value = true
  currentStep.value = 0
  currentFieldValue.value = ''
  newCollection.value = { name: '', content: '', description: '' }
}

const nextStep = () => {
  if (!currentFieldValue.value.trim()) return
  
  if (currentStep.value === 0) {
    newCollection.value.name = currentFieldValue.value
    currentStep.value = 1
    currentFieldValue.value = ''
  } else if (currentStep.value === 1) {
    newCollection.value.content = currentFieldValue.value
    currentStep.value = 2
    currentFieldValue.value = ''
  } else if (currentStep.value === 2) {
    newCollection.value.description = currentFieldValue.value
    saveNewCollection()
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    if (currentStep.value === 0) {
      currentFieldValue.value = newCollection.value.name
    } else if (currentStep.value === 1) {
      currentFieldValue.value = newCollection.value.content
    } else {
      currentFieldValue.value = newCollection.value.description
    }
  }
}

const saveNewCollection = () => {
  const collection: Collection = {
    id: Date.now().toString(),
    name: newCollection.value.name,
    content: newCollection.value.content,
    description: newCollection.value.description,
    color: '#8b949e',
    progress: 0,
    itemsCount: 0,
    type: 'collection',
    notificationCount: 0,
    tags: [],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  }

  collections.value.push(collection)
  isCreatingCollection.value = false
  currentStep.value = 0
  currentFieldValue.value = ''
}

// Handle background click
const handleBackgroundClick = (event: Event) => {
  // If we're creating a collection and clicked outside the form, cancel
  if (isCreatingCollection.value) {
    const target = event.target as HTMLElement
    // Check if clicked outside any tetris-card (including the add card)
    if (!target.closest('.tetris-card')) {
      cancelCreateCollection()
    }
  }
}

const cancelCreateCollection = () => {
  isCreatingCollection.value = false
  currentStep.value = 0
  currentFieldValue.value = ''
  newCollection.value = { name: '', content: '', description: '' }
}

// Screen size detection
const updateScreenSize = () => {
  isNarrowScreen.value = window.innerWidth < 768
  calculateSquareGrid()
}

// Calculate optimal grid for square cards with equal stretching
const calculateSquareGrid = () => {
  const container = document.querySelector('.square-grid')
  if (!container) return
  
  const containerWidth = container.offsetWidth
  const gap = 16 // 1rem gap
  
  // Адаптивные размеры в зависимости от экрана
  let minCardWidth, maxCardWidth
  if (window.innerWidth <= 480) {
    minCardWidth = 110
    maxCardWidth = 220
  } else if (window.innerWidth <= 768) {
    minCardWidth = 130
    maxCardWidth = 260
  } else {
    minCardWidth = 150
    maxCardWidth = 300
  }
  
  console.log('Container width:', containerWidth, 'Min card width:', minCardWidth)
  
  // Calculate how many cards fit with minimum width
  const cardsWithMinWidth = Math.floor((containerWidth + gap) / (minCardWidth + gap))
  
  console.log('Cards with min width:', cardsWithMinWidth)
  
  if (cardsWithMinWidth <= 0) {
    squareGridStyle.value = ``
    return
  }
  
  // Calculate remaining space
  const usedWidth = cardsWithMinWidth * minCardWidth + (cardsWithMinWidth - 1) * gap
  const remainingSpace = containerWidth - usedWidth
  
  console.log('Used width:', usedWidth, 'Remaining space:', remainingSpace)
  
  // If we can fit one more card with minimum width + buffer, do it
  const buffer = 1 // 1px буфер чтобы карточки не переносились при растяжении
  if (remainingSpace >= minCardWidth + gap + buffer) {
    const totalCards = cardsWithMinWidth + 1
    console.log('Adding one more card, total:', totalCards)
    squareGridStyle.value = ``
  } else {
    // Otherwise, stretch existing cards equally with buffer
    const availableSpace = remainingSpace - buffer // Убираем буфер из доступного места
    const stretchAmount = Math.min(availableSpace / cardsWithMinWidth, maxCardWidth - minCardWidth)
    const finalCardWidth = minCardWidth + stretchAmount
    console.log('Stretching cards to:', finalCardWidth, 'with buffer:', buffer)
    squareGridStyle.value = `--card-width: ${finalCardWidth}px !important;`
  }
  
  // После расчета сетки, проверяем текст в карточках
  setTimeout(() => {
    adjustTextSizes()
  }, 100)
}

// Функция для динамической настройки размера текста
const adjustTextSizes = () => {
  const cards = document.querySelectorAll('.tetris-card.collection-type')
  
  cards.forEach((card) => {
    const textElement = card.querySelector('.text-lg')
    if (!textElement) return
    
    // ПРИНУДИТЕЛЬНО устанавливаем ВСЕ ограничения
    textElement.style.setProperty('max-width', '100%', 'important')
    textElement.style.setProperty('width', '100%', 'important')
    textElement.style.setProperty('box-sizing', 'border-box', 'important')
    textElement.style.setProperty('word-wrap', 'break-word', 'important')
    textElement.style.setProperty('overflow-wrap', 'break-word', 'important')
    textElement.style.setProperty('white-space', 'normal', 'important')
    textElement.style.setProperty('word-break', 'break-word', 'important')
    textElement.style.setProperty('overflow', 'hidden', 'important')
    textElement.style.setProperty('display', 'block', 'important')
    
    // Принудительно ограничиваем контейнер
    const textContainer = textElement.parentElement
    if (textContainer) {
      textContainer.style.setProperty('max-width', '100%', 'important')
      textContainer.style.setProperty('overflow', 'hidden', 'important')
      textContainer.style.setProperty('box-sizing', 'border-box', 'important')
    }
    
    // Простая настройка - уменьшаем размер шрифта для длинных слов
    const text = textElement.textContent || ''
    const cardWidth = card.offsetWidth
    
    // Базовый размер шрифта в зависимости от ширины карточки
    let fontSize = Math.max(8, Math.min(12, cardWidth / 15))
    
    // Дополнительно уменьшаем для длинных слов
    if (text.length > 12) {
      fontSize *= 0.8
    }
    if (text.length > 20) {
      fontSize *= 0.7
    }
    
    // Применяем размер
    textElement.style.setProperty('font-size', `${fontSize}px`, 'important')
  })
}


// Watch for changes in collection types to recalculate grid
watch(collectionTypes, () => {
  nextTick(() => {
    setTimeout(() => {
      calculateSquareGrid()
    }, 100)
  })
}, { deep: true })

// Watch for window resize to adjust text sizes
const handleResize = () => {
  updateScreenSize()
  setTimeout(() => {
    adjustTextSizes()
  }, 200)
}

// Lifecycle
onMounted(() => {
  collections.value = mockCollections
  collectionTypes.value = mockCollectionTypes.sort((a, b) => a.order - b.order)
  updateScreenSize()
  window.addEventListener('resize', handleResize)
  
  // Recalculate grid after DOM is fully rendered
  nextTick(() => {
    setTimeout(() => {
      calculateSquareGrid()
      // Дополнительный вызов для текста
      setTimeout(() => {
        adjustTextSizes()
      }, 200)
    }, 100)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Page specific styles */
</style>