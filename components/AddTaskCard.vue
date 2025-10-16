<template>
  <div 
    @click="handleCardClick"
    :class="[
      'glass-card tetris-card add-card group relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer touch-manipulation',
      isCreating ? 'p-3' : 'flex items-center justify-center p-2 hover:bg-white/10'
    ]"
    :style="isCreating ? 'height: auto !important; min-height: 70px !important;' : 'height: 60px !important; min-height: 60px !important;'"
  >
    <!-- Water effect (only when expanded) -->
    <WaveEffect v-if="isCreating" :progress="0" />
    
    <!-- Content -->
    <div class="relative z-20">
      <!-- Collapsed state: Plus button -->
      <div v-if="!isCreating" class="flex items-center justify-center" @click.stop>
        <svg class="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" style="transform: translateY(5px);">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      
      <!-- Choice state: Task or Collection -->
      <div v-else-if="currentStep === -1" class="space-y-3">
        <div class="flex gap-3">
          <!-- Task option -->
          <button 
            @click.stop="selectTask"
            class="flex-1 px-4 py-3 rounded-xl glass-effect text-white hover:bg-white/10 transition-colors border border-white/20 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-sm font-medium">Предметы</span>
          </button>
          
          <!-- Collection option -->
          <button 
            @click.stop="selectCollection"
            class="flex-1 px-4 py-3 rounded-xl glass-effect text-white hover:bg-white/10 transition-colors border border-white/20 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span class="text-sm font-medium">Коллекция</span>
          </button>
        </div>
        
        <!-- Progress dots -->
        <div class="flex justify-center gap-2">
          <div 
            v-for="step in 3" 
            :key="step"
            :class="[
              'w-2 h-2 rounded-full transition-colors',
              step <= currentStep + 2 ? 'bg-white/60' : 'bg-white/20'
            ]"
          ></div>
        </div>
      </div>
      
      <!-- Expanded state: Form -->
      <div v-else class="space-y-2">
        <!-- Current Field -->
        <div class="flex items-center gap-3">
          <!-- Back button -->
          <button 
            v-if="currentStep >= 0"
            @click.stop="handlePreviousStep"
            class="w-8 h-8 rounded-full glass-effect text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <!-- Input field -->
          <div class="flex-1">
            <input 
              ref="currentInput"
              v-model="localFieldValue"
              @input="handleInputUpdate"
              type="text"
              :placeholder="getCurrentPlaceholder()"
              @keydown.enter="handleNextStep"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>
          
          <!-- Next/Save button -->
          <button 
            @click.stop="handleNextStep"
            :disabled="!localFieldValue.trim()"
            class="w-8 h-8 rounded-full glass-effect text-white hover:bg-white/10 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="currentStep < 1" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        
        <!-- Progress dots -->
        <div class="flex justify-center gap-2">
          <div 
            v-for="step in 3" 
            :key="step"
            :class="[
              'w-2 h-2 rounded-full transition-colors',
              step <= currentStep + 2 ? 'bg-white/60' : 'bg-white/20'
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import WaveEffect from './WaveEffect.vue'

// Props
interface Props {
  isCreating: boolean
  currentStep: number
  currentFieldValue: string
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  cardClick: []
  nextStep: []
  previousStep: []
  updateFieldValue: [value: string]
  selectTask: []
  selectCollection: []
}>()

// Refs
const currentInput = ref<HTMLInputElement | null>(null)
const localFieldValue = ref(props.currentFieldValue)

// Methods
const getCurrentPlaceholder = () => {
  const placeholders = [
    'Название',
    'Описание'
  ]
  return placeholders[props.currentStep] || ''
}

const handleCardClick = () => {
  if (!props.isCreating) {
    emit('cardClick')
  }
}

const handleNextStep = () => {
  emit('nextStep')
}

const handlePreviousStep = () => {
  if (props.currentStep === 0) {
    // If we're on the first step (name), go back to choice
    emit('previousStep')
  } else {
    emit('previousStep')
  }
}

const handleInputUpdate = () => {
  emit('updateFieldValue', localFieldValue.value)
}

const selectTask = () => {
  emit('selectTask')
}

const selectCollection = () => {
  emit('selectCollection')
}

// Watch for currentStep changes to focus input
watch(() => props.currentStep, async () => {
  await nextTick()
  if (currentInput.value) {
    currentInput.value.focus()
  }
})

// Watch for isCreating changes to focus input
watch(() => props.isCreating, async (newValue) => {
  if (newValue) {
    await nextTick()
    setTimeout(() => {
      if (currentInput.value) {
        currentInput.value.focus()
      }
    }, 600) // Delay for animation completion
  }
})

// Watch for prop changes to update local value
watch(() => props.currentFieldValue, (newValue) => {
  localFieldValue.value = newValue
})
</script>
