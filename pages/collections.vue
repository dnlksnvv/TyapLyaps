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
    
    <!-- Bottom spacing -->
    <div class="h-8"></div>
  </div>
</template>

<script setup lang="ts">
// Use default layout
definePageMeta({
  layout: 'default'
})

import { ref, computed, onMounted, onUnmounted } from 'vue'
import StatsCard from '~/components/StatsCard.vue'
import CollectionCard from '~/components/CollectionCard.vue'
import AddCollectionCard from '~/components/AddCollectionCard.vue'
import { mockCollections, type Collection } from '~/data/mockData'

// Data
const collections = ref<Collection[]>([])

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
    hasNotification: false,
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
}

// Lifecycle
onMounted(() => {
  collections.value = mockCollections
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<style scoped>
/* Page specific styles */
</style>