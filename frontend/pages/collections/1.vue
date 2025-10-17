<template>
  <div 
    class="min-h-screen"
    @click="handleBackgroundClick"
  >
    <!-- Header -->
    <header class="glass-header sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Back button and title -->
          <div class="flex items-center">
            <button 
              @click="goBack"
              class="mr-4 p-2 rounded-lg glass-effect text-white hover:bg-white/10 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold gradient-text">
                ВСЕ ПРЕДМЕТЫ
              </h1>
            </div>
          </div>
          
          <!-- User menu -->
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-sm font-bold text-white">С</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Scrollable Content Area -->
    <div class="scrollable-content">
      <main class="px-4 sm:px-6 lg:px-8 py-8">

                   <!-- Collection Info -->
                   <div class="mb-8 parallax-element">
                     <div class="glass-card p-6">
                       <div class="flex items-center justify-between mb-4">
                         <div>
                           <h2 class="text-2xl font-bold text-white mb-2">ВСЕ ПРЕДМЕТЫ</h2>
                           <p class="text-gray-300 mb-1">{{ collection?.content }}</p>
                           <p class="text-gray-400 text-sm">{{ collection?.description }}</p>
                         </div>
                         <div class="text-right">
                           <div class="text-2xl font-bold text-white">{{ collection?.progress || 0 }}%</div>
                           <div class="text-sm text-gray-300">Прогресс</div>
                         </div>
                       </div>
                     </div>
                   </div>

                   <!-- Stats Overview -->
                   <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8 parallax-element">
                     <StatsCard
                       :value="progressStats.totalTasks"
                       label="Всего предметов"
                       icon="subjects"
                     />
                     
                     <StatsCard
                       :value="progressStats.completedTasks"
                       label="Завершено"
                       icon="completed"
                     />
                     
                     <StatsCard
                       :value="progressStats.totalLabs"
                       label="Всего лаб"
                       icon="schedule"
                     />
                     
                     <StatsCard
                       :value="`${progressStats.overallProgress}%`"
                       label="Общий прогресс"
                       icon="progress"
                     />
                   </div>

                   <!-- All Tasks -->
                   <div class="mb-8 parallax-element">
                     <div class="flex items-center justify-between mb-4">
                       <h3 class="text-xl font-semibold text-white">Предметы</h3>
                     </div>
                     
                     <!-- Tasks Grid -->
                     <div class="tetris-grid">
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
        
        <!-- Add Subject Button / Creation Card -->
        <AddTaskCard
          :is-creating="isCreatingTask"
          :current-step="currentStep"
          :current-field-value="currentFieldValue"
          @card-click="addNewTask"
          @next-step="nextStep"
          @previous-step="previousStep"
          @update-field-value="(value) => currentFieldValue = value"
        />
      </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TaskCard from '~/components/TaskCard.vue'
import AddTaskCard from '~/components/AddTaskCard.vue'
import StatsCard from '~/components/StatsCard.vue'
import { mockCollections, mockTasks, type Collection, type Task } from '~/data/mockData'

console.log('Script setup executed - COLLECTION 1 PAGE')

// Collection ID is hardcoded to '1'
const collectionId = '1'
console.log('Collection ID:', collectionId)

// Add subject state
const isCreatingTask = ref(false)
const currentStep = ref(0) // 0: название, 1: описание
const currentFieldValue = ref('')
const newTask = ref({
  name: '',
  description: ''
})

// Expanded cards state
const expandedCards = ref<Set<string>>(new Set())

// Screen size state
const isNarrowScreen = ref(false)

// Update screen size on mount and resize
const updateScreenSize = () => {
  const wasNarrowScreen = isNarrowScreen.value
  isNarrowScreen.value = window.innerWidth <= 768
  
  // If switching to narrow screen, collapse all cards
  if (!wasNarrowScreen && isNarrowScreen.value) {
    expandedCards.value.clear()
  }
}

onMounted(() => {
  console.log('Component mounted, calling loadMockData')
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
  
  // Collapse all cards on narrow screens
  if (isNarrowScreen.value) {
    expandedCards.value.clear()
  }
  
  loadMockData()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})

// Card expansion functions
const toggleCardExpansion = (cardId: string) => {
  console.log('Toggle expansion for card:', cardId, 'currently expanded:', expandedCards.value.has(cardId))
  
  if (expandedCards.value.has(cardId)) {
    // If clicking on already expanded card, collapse it
    expandedCards.value.delete(cardId)
    console.log('Card collapsed')
  } else {
    // If clicking on collapsed card, collapse all others and expand this one
    expandedCards.value.clear()
    expandedCards.value.add(cardId)
    console.log('Card expanded')
  }
}

const isCardExpanded = (cardId: string) => {
  return expandedCards.value.has(cardId)
}

// Navigation functions
const goBack = () => {
  window.history.back()
}

// Background click handler
const handleBackgroundClick = (event: Event) => {
  // If we're creating a subject and clicked outside the form, cancel
  if (isCreatingTask.value) {
    const target = event.target as HTMLElement
    if (!target.closest('.tetris-card')) {
      cancelCreateTask()
    }
  }
}

// Next step function
const nextStep = () => {
  if (!currentFieldValue.value.trim()) return
  
  // Save current value
  if (currentStep.value === 0) {
    newTask.value.name = currentFieldValue.value.trim()
  } else if (currentStep.value === 1) {
    newTask.value.description = currentFieldValue.value.trim()
  }
  
  // Move to next step or save
  if (currentStep.value < 1) {
    currentStep.value++
    currentFieldValue.value = ''
  } else {
    // Save the subject
    saveNewTask()
  }
}

// Previous step function
const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    // Restore previous value
    if (currentStep.value === 0) {
      currentFieldValue.value = newTask.value.name
    }
  }
}

// Add new subject function
const addNewTask = () => {
  console.log('Add new subject clicked')
  isCreatingTask.value = true
  currentStep.value = 0
  currentFieldValue.value = ''
  // Reset form
  newTask.value = {
    name: '',
    description: ''
  }
}

// Cancel creating subject
const cancelCreateTask = () => {
  isCreatingTask.value = false
  currentStep.value = 0
  currentFieldValue.value = ''
  newTask.value = {
    name: '',
    description: ''
  }
}

// Save new subject
const saveNewTask = () => {
  if (!newTask.value.name || !newTask.value.description) {
    alert('Пожалуйста, заполните все поля')
    return
  }

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
    notificationCount: 0,
    hasLabNotification: false,
    hasAttestationNotification: false,
    hasCourseworkNotification: false,
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  }

  tasks.value.push(task)
  isCreatingTask.value = false
  currentStep.value = 0
  currentFieldValue.value = ''
  
  console.log('Subject created:', task)
}

// Handle card click based on card state
const handleCardClick = (taskId: string, event: Event) => {
  console.log('Card clicked:', taskId, 'isNarrowScreen:', isNarrowScreen.value, 'isExpanded:', isCardExpanded(taskId))
  
  if (isNarrowScreen.value) {
    // On narrow screens: toggle expansion if collapsed, navigate if expanded
    if (isCardExpanded(taskId)) {
      console.log('Navigating to subject page (expanded card)')
      // Navigate to subject details
    } else {
      console.log('Expanding card')
      toggleCardExpansion(taskId)
    }
  } else {
    // On wide screens: always navigate
    console.log('Navigating to subject page (wide screen)')
    // Navigate to subject details
  }
}

// Types
interface ProgressStats {
  totalTasks: number
  completedTasks: number
  totalLabs: number
  overallProgress: number
}

// Reactive data
const collection = ref<Collection | null>(null)
const tasks = ref<Task[]>([])

// Computed
const progressStats = computed((): ProgressStats => {
  console.log('Computing stats for tasks:', tasks.value.length, tasks.value)
  
  const totalTasks = tasks.value.length
  const completedTasks = tasks.value.filter(t => t.status === 'completed').length
  
  const totalLabs = tasks.value.reduce((acc, task) => 
    acc + task.totalLabs, 0
  )
  
  const overallProgress = totalTasks > 0 
    ? Math.round(tasks.value.reduce((acc, t) => acc + t.progress, 0) / totalTasks)
    : 0
  
  const stats = {
    totalTasks,
    completedTasks,
    totalLabs,
    overallProgress
  }
  
  console.log('Computed stats:', stats)
  return stats
})

const loadMockData = () => {
  console.log('Loading data for collectionId:', collectionId, 'type:', typeof collectionId)
  
  // Find collection by ID
  collection.value = mockCollections.find(c => c.id === collectionId) || null
  console.log('Found collection:', collection.value)
  
  // Load subjects for this collection
  tasks.value = mockTasks.filter(t => t.collectionId === collectionId)
  console.log('Found tasks:', tasks.value.length, tasks.value)
}
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #f0f6fc 0%, #8b949e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
