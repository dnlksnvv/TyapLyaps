<template>
  <div @click="handleBackgroundClick">
  <!-- Stats Overview -->
  <div class="px-4 sm:px-6 lg:px-8 mb-8">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 parallax-element">
    <StatsCard
      :value="tasks.length"
      label="Всего предметов"
      icon="subjects"
    />
    
    <StatsCard
      :value="completedTasks"
      label="Завершено"
      icon="completed"
    />
    
    <StatsCard
      :value="totalLabs"
      label="Всего лаб"
      icon="labs"
    />
    
    <StatsCard
      :value="overallProgress"
      label="Общий прогресс"
      icon="progress"
    />
    </div>
  </div>

  <!-- Tasks Grid -->
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="tetris-grid parallax-element">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :is-expanded="isCardExpanded(task.id)"
      :is-narrow-screen="isNarrowScreen"
      @card-click="handleCardClick"
      @toggle-expansion="toggleCardExpansion"
    />
  </div>
  
    <!-- Add Task Button / Creation Card -->
    <AddTaskCard
      :is-creating="isCreatingTask"
      :current-step="currentStep"
      :current-field-value="currentFieldValue"
      @card-click="addNewTask"
      @next-step="nextStep"
      @previous-step="previousStep"
      @update-field-value="(value) => currentFieldValue = value"
      @select-task="selectTask"
      @select-collection="selectCollection"
    />
    </div>
  </div>
  
  <!-- Bottom spacing -->
  <div class="h-8"></div>
</template>

<script setup lang="ts">
// Use default layout
definePageMeta({
  layout: 'default'
})

import { ref, computed, onMounted, onUnmounted } from 'vue'
import TaskCard from '~/components/TaskCard.vue'
import AddTaskCard from '~/components/AddTaskCard.vue'
import StatsCard from '~/components/StatsCard.vue'
import { mockCollections, mockTasks, type Collection, type Task } from '~/data/mockData'

// Collection ID is hardcoded to '1'
const collectionId = '1'

// Add task state
const isCreatingTask = ref(false)
const currentStep = ref(-1) // Start with choice state
const currentFieldValue = ref('')
const newTask = ref({
  name: '',
  description: ''
})

// Expanded cards state
const expandedCards = ref<Set<string>>(new Set())

// Screen size state
const isNarrowScreen = ref(false)

// Data
const tasks = ref<Task[]>([])

// Computed properties
const completedTasks = computed(() => {
  return tasks.value.filter(task => task.progress === 100).length
})

const totalLabs = computed(() => {
  return tasks.value.reduce((total, task) => total + task.totalLabs, 0)
})

const overallProgress = computed(() => {
  if (tasks.value.length === 0) return 0
  const totalProgress = tasks.value.reduce((sum, task) => sum + task.progress, 0)
  return Math.round(totalProgress / tasks.value.length)
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
const handleCardClick = (taskId: string, event: Event) => {
  // Close creation form if open
  if (isCreatingTask.value) {
    cancelCreateTask()
  }
  
  if (isNarrowScreen.value) {
    // On narrow screens: close all other cards first, then toggle current
    if (!isCardExpanded(taskId)) {
      console.log('Expanding card')
      // Close all other cards first
      expandedCards.value.clear()
      // Then expand current card
      toggleCardExpansion(taskId)
    } else {
      console.log('Navigating to task details')
      // Navigate to task details page
      window.location.href = `/tasks/${taskId}`
    }
  } else {
    // On wide screens: always navigate
    console.log('Navigating to task details')
    window.location.href = `/tasks/${taskId}`
  }
}

// Task creation functions
const addNewTask = () => {
  isCreatingTask.value = true
  currentStep.value = -1 // Start with choice
  currentFieldValue.value = ''
  newTask.value = { name: '', description: '' }
}

const selectTask = () => {
  currentStep.value = 0 // Start with name input
}

const selectCollection = () => {
  window.location.href = '/collections'
}

const nextStep = () => {
  if (!currentFieldValue.value.trim()) return
  
  if (currentStep.value === 0) {
    newTask.value.name = currentFieldValue.value
    currentStep.value = 1
    currentFieldValue.value = ''
  } else if (currentStep.value === 1) {
    newTask.value.description = currentFieldValue.value
    saveNewTask()
  }
}

const previousStep = () => {
  if (currentStep.value === 0) {
    // If we're on the first step (name), go back to choice
    currentStep.value = -1
  } else if (currentStep.value > 0) {
    currentStep.value--
    if (currentStep.value === 0) {
      currentFieldValue.value = newTask.value.name
    } else {
      currentFieldValue.value = newTask.value.description
    }
  }
}

const saveNewTask = () => {
  const task: Task = {
    id: Date.now().toString(),
    name: newTask.value.name,
    description: newTask.value.description,
    color: '#8b949e',
    progress: 0,
    collectionId: collectionId,
    totalLabs: 0,
    completedLabs: 0,
    totalAttestations: 0,
    completedAttestations: 0,
    totalCourseworks: 0,
    completedCourseworks: 0,
    hasNotification: false,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  }

  tasks.value.push(task)
  isCreatingTask.value = false
  currentStep.value = -1
  currentFieldValue.value = ''
  
  console.log('Task created:', task)
}

// Handle background click
const handleBackgroundClick = (event: Event) => {
  // If we're creating a task and clicked outside the form, cancel
  if (isCreatingTask.value) {
    const target = event.target as HTMLElement
    // Check if clicked outside any tetris-card (including the add card)
    if (!target.closest('.tetris-card')) {
      cancelCreateTask()
    }
  }
}

const cancelCreateTask = () => {
  isCreatingTask.value = false
  currentStep.value = -1
  currentFieldValue.value = ''
  newTask.value = { name: '', description: '' }
}

// Screen size detection
const updateScreenSize = () => {
  isNarrowScreen.value = window.innerWidth < 768
}

// Load data
const loadTasks = () => {
  tasks.value = mockTasks.filter(task => task.collectionId === collectionId)
  console.log('Loaded tasks for collection:', collectionId, tasks.value)
}

// Lifecycle
onMounted(() => {
  loadTasks()
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