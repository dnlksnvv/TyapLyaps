<template>
  <div class="glass-card group relative overflow-hidden p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-center w-8 h-8 rounded-lg" :class="iconBgClass">
        <svg class="w-4 h-4" :class="iconColorClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath" />
        </svg>
      </div>
      <div class="text-right">
        <h3 class="text-xl font-bold text-white">{{ value }}</h3>
        <p class="text-xs text-gray-300">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  value: string | number
  label: string
  icon: 'subjects' | 'completed' | 'schedule' | 'progress'
}

const props = defineProps<Props>()

// Computed properties for styling
const iconBgClass = computed(() => {
  const classes = {
    subjects: 'bg-green-500/20',
    completed: 'bg-blue-500/20',
    schedule: 'bg-yellow-500/20',
    progress: 'bg-purple-500/20'
  }
  return classes[props.icon]
})

const iconColorClass = computed(() => {
  const classes = {
    subjects: 'text-green-500',
    completed: 'text-blue-500',
    schedule: 'text-yellow-500',
    progress: 'text-purple-500'
  }
  return classes[props.icon]
})

const iconPath = computed(() => {
  const paths = {
    subjects: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    completed: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    schedule: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    progress: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  }
  return paths[props.icon]
})
</script>
