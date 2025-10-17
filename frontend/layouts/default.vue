<template>
  <div 
    class="min-h-screen"
    @click="handleBackgroundClick"
    style="-webkit-tap-highlight-color: transparent; touch-action: manipulation;"
  >
    <!-- Header -->
    <header class="glass-header sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold gradient-text">
                TyapLyaps
              </h1>
            </div>
          </div>
          
          <!-- User menu -->
          <div class="flex items-center space-x-4">
            <!-- Mobile menu button -->
            <button 
              @click.stop="toggleMobileMenu"
              class="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors relative z-50"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-sm font-bold text-white">С</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar Menu -->
    <SidebarMenu 
      :is-open="isMenuOpen"
      @menu-click="closeMobileMenu"
    />
    

    <!-- Mobile menu overlay -->
    <div 
      v-if="isMenuOpen"
      @click="closeMobileMenu"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
    ></div>

    <!-- Scrollable Content Area -->
    <div class="scrollable-content lg:ml-72">
      <main class="px-0 sm:px-4 lg:px-8 py-0 sm:py-8">
        <!-- Page content will be inserted here -->
        <div class="w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SidebarMenu from '~/components/SidebarMenu.vue'

// Mobile menu state
const menuState = reactive({
  isOpen: false,
  forceUpdate: 0
})

// Computed for template reactivity
const isMenuOpen = computed(() => menuState.isOpen)
const menuForceUpdate = computed(() => menuState.forceUpdate)

// Mobile menu functions
const toggleMobileMenu = async () => {
  console.log('Toggle mobile menu clicked, current state:', menuState.isOpen)
  menuState.isOpen = !menuState.isOpen
  menuState.forceUpdate++
  await nextTick()
  console.log('New state:', menuState.isOpen)
}

const closeMobileMenu = () => {
  menuState.isOpen = false
  console.log('Menu closed, state:', menuState.isOpen)
}

// Handle background click
const handleBackgroundClick = (event: Event) => {
  // Only close menu if clicking outside the menu and button
  const target = event.target as HTMLElement
  if (!target.closest('.sidebar-menu') && !target.closest('button')) {
    closeMobileMenu()
  }
}

// Параллакс эффект при движении мыши
onMounted(() => {
  let mouseX = 0
  let mouseY = 0
  let isMoving = false
  let animationFrame = null
  let lastMouseX = 0
  let lastMouseY = 0
  let stopTimer = null

  const handleMouseMove = (e) => {
    // Очищаем таймер остановки
    if (stopTimer) {
      clearTimeout(stopTimer)
    }
    
    // Проверяем, действительно ли мышь движется
    const deltaX = Math.abs(e.clientX - lastMouseX)
    const deltaY = Math.abs(e.clientY - lastMouseY)
    
    if (deltaX > 1 || deltaY > 1) {
      if (!isMoving) {
        isMoving = true
        // Останавливаем CSS анимации
        const elements = document.querySelectorAll('.parallax-element:not(.glass-header)')
        elements.forEach(element => {
          element.style.animationPlayState = 'paused'
        })
        requestAnimationFrame(updateElements)
      }
      
      mouseX = e.clientX
      mouseY = e.clientY
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      
      // Устанавливаем таймер для остановки
      stopTimer = setTimeout(() => {
        isMoving = false
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
        resetElements()
        // Возобновляем CSS анимации
        const elements = document.querySelectorAll('.parallax-element:not(.glass-header)')
        elements.forEach(element => {
          element.style.animationPlayState = 'running'
        })
      }, 100) // 100ms задержка после остановки мыши
    }
  }

  const handleMouseLeave = () => {
    isMoving = false
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    if (stopTimer) {
      clearTimeout(stopTimer)
    }
    resetElements()
    // Возобновляем CSS анимации
    const elements = document.querySelectorAll('.parallax-element:not(.glass-header)')
    elements.forEach(element => {
      element.style.animationPlayState = 'running'
    })
  }

  const updateElements = () => {
    if (!isMoving) return

    const elements = document.querySelectorAll('.parallax-element:not(.glass-header)')
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    const deltaX = (mouseX - centerX) / centerX
    const deltaY = (mouseY - centerY) / centerY
    
    // Находим активный блок (тот, в котором находится мышь)
    let activeBlock = null
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const isMouseInside = mouseX >= rect.left && mouseX <= rect.right && 
                           mouseY >= rect.top && mouseY <= rect.bottom
      if (isMouseInside) {
        activeBlock = element
      }
    })
    
    elements.forEach((element, index) => {
      // Двигаем только элементы активного блока
      if (activeBlock === element) {
        // Разная интенсивность для разных элементов
        const intensity = 0.3 + (index % 3) * 0.2 // 0.3, 0.5, 0.7
        const moveX = deltaX * 5 * intensity
        const moveY = deltaY * 5 * intensity
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        // Все остальные элементы возвращаем в исходное положение
        element.style.transform = 'translate(0px, 0px)'
      }
    })

    animationFrame = requestAnimationFrame(updateElements)
  }

  const resetElements = () => {
    const elements = document.querySelectorAll('.parallax-element:not(.glass-header)')
    elements.forEach(element => {
      element.style.transform = 'translate(0px, 0px)'
    })
  }

  // Добавляем слушатели событий
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
  
  // Очистка при размонтировании
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    if (stopTimer) {
      clearTimeout(stopTimer)
    }
  })
})
</script>
