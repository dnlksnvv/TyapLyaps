<template>
  <!-- Header Container - полностью независимый -->
  <div class="header-container">
    <!-- Desktop Header -->
    <header :class="['glass-header hidden lg:block', { 'transparent': isHeaderTransparent }]">
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
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-sm font-bold text-white">С</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Header -->
    <header :class="['mobile-header lg:hidden', { 'browser-mode': isBrowserMode, 'transparent': isHeaderTransparent }]">
      <div class="h-full flex items-end justify-start px-4 pb-2">
        <!-- Mobile menu icon -->
        <svg 
          @click.stop="toggleMobileMenu"
          @touchstart.stop="toggleMobileMenu"
          class="w-7 h-7 text-white cursor-pointer hover:text-white/80 transition-colors"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          stroke-width="2.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
    </header>
  </div>

    <!-- Main Content Container -->
    <div 
      :class="[
        'main-content-container',
        { 'menu-open': isMenuOpen }
      ]"
      @click="handleBackgroundClick"
      style="-webkit-tap-highlight-color: transparent; touch-action: manipulation;"
    >

    <!-- Sidebar Menu -->
    <SidebarMenu 
      :is-open="isMenuOpen"
      :class="{ 'menu-open': isMenuOpen }"
      @menu-click="closeMobileMenu"
    />
    
    <!-- Menu overlay for mobile -->
    <div 
      v-if="isMenuOpen"
      @click="closeMobileMenu"
      class="fixed inset-0 bg-black/30 z-30 lg:hidden"
    ></div>

    <!-- Scrollable Content Area -->
    <div :class="['scrollable-content lg:ml-72', { 'browser-mode': isBrowserMode }]">
      <main class="px-0 sm:px-4 lg:px-8 py-0 sm:px-4 lg:px-8 py-0 sm:py-8 pb-20 lg:pb-8">
        <!-- Page content will be inserted here -->
        <div class="w-full">
          <slot />
        </div>
      </main>
    </div>
  </div>

  <!-- Mobile Bottom Navigation -->
  <nav :class="['mobile-bottom-nav lg:hidden', { 'transparent': isBottomNavTransparent }]">
    <div class="flex justify-around items-center h-full">
      <!-- Home -->
      <NuxtLink to="/" class="nav-item" @click="handleNavClick">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1">Главная</span>
      </NuxtLink>

      <!-- Subjects -->
      <NuxtLink to="/subjects" class="nav-item" @click="handleNavClick">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-xs mt-1">Предметы</span>
      </NuxtLink>

      <!-- Collections -->
      <NuxtLink to="/collections" class="nav-item" @click="handleNavClick">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span class="text-xs mt-1">Коллекции</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import SidebarMenu from '~/components/SidebarMenu.vue'

// Mobile menu state
const menuState = reactive({
  isOpen: false,
  forceUpdate: 0
})

// Computed for template reactivity
const isMenuOpen = computed(() => menuState.isOpen)
const menuForceUpdate = computed(() => menuState.forceUpdate)

// Detect if running in browser or PWA mode
const isBrowserMode = ref(false)

// Header transparency state
const isHeaderTransparent = ref(false)

// Bottom navigation transparency state
const isBottomNavTransparent = ref(false)

// Mobile menu functions
const toggleMobileMenu = async (event) => {
  console.log('Toggle mobile menu clicked, current state:', menuState.isOpen, 'Event:', event)
  event.preventDefault()
  event.stopPropagation()
  menuState.isOpen = !menuState.isOpen
  menuState.forceUpdate++
  await nextTick()
  console.log('New state:', menuState.isOpen)
}

const closeMobileMenu = () => {
  menuState.isOpen = false
  console.log('Menu closed, state:', menuState.isOpen)
}

// Handle navigation clicks
const handleNavClick = (event) => {
  console.log('Navigation clicked:', event.target.closest('a')?.href)
  closeMobileMenu()
}

// Handle background click
const handleBackgroundClick = (event: Event) => {
  // Only close menu if clicking outside the menu and button
  const target = event.target as HTMLElement
  if (!target.closest('.sidebar-menu') && !target.closest('button')) {
    closeMobileMenu()
  }
}

// Handle scroll for header and bottom nav transparency
const handleScroll = () => {
  const scrollableContent = document.querySelector('.scrollable-content')
  if (!scrollableContent) return
  
  const scrollY = scrollableContent.scrollTop
  const scrollHeight = scrollableContent.scrollHeight
  const clientHeight = scrollableContent.clientHeight
  
  const headerThreshold = 50 // Начинаем делать прозрачным после 50px прокрутки
  const bottomNavThreshold = 100 // Нижнее меню становится прозрачным после 100px прокрутки
  
  // Header transparency
  if (scrollY > headerThreshold) {
    isHeaderTransparent.value = true
  } else {
    isHeaderTransparent.value = false
  }
  
  // Bottom nav transparency - проверяем, есть ли контент под меню
  const distanceFromBottom = scrollHeight - scrollY - clientHeight
  const hasContentBelow = distanceFromBottom > 50 // Есть контент под меню (с запасом 50px)
  
  // Меню становится прозрачным только если есть контент под меню
  if (hasContentBelow) {
    isBottomNavTransparent.value = true
  } else {
    isBottomNavTransparent.value = false
  }
}

// Параллакс эффект при движении мыши
onMounted(() => {
  // Detect if running in browser or PWA mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const isInApp = window.navigator.standalone === true
  isBrowserMode.value = !isStandalone && !isInApp
  
  console.log('App mode detection:', {
    isStandalone,
    isInApp,
    isBrowserMode: isBrowserMode.value
  })
  
  // Add scroll listener for header transparency to scrollable content
  const scrollableContent = document.querySelector('.scrollable-content')
  if (scrollableContent) {
    scrollableContent.addEventListener('scroll', handleScroll, { passive: true })
  }

  // Block overscroll on headers and menu (but allow clicks on buttons)
  const preventOverscroll = (e) => {
    // Allow clicks on buttons and interactive elements
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]')) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // Add event listeners to prevent overscroll
  const header = document.querySelector('.mobile-header')
  const sidebar = document.querySelector('.sidebar-menu')
  
  if (header) {
    header.addEventListener('touchstart', preventOverscroll, { passive: false })
    header.addEventListener('touchmove', preventOverscroll, { passive: false })
    header.addEventListener('touchend', preventOverscroll, { passive: false })
  }
  
  if (sidebar) {
    sidebar.addEventListener('touchstart', preventOverscroll, { passive: false })
    sidebar.addEventListener('touchmove', preventOverscroll, { passive: false })
    sidebar.addEventListener('touchend', preventOverscroll, { passive: false })
  }

  // Watch for menu open/close to apply additional protection
  watch(isMenuOpen, (isOpen) => {
    if (isOpen) {
      // When menu opens, add additional protection
      const openMenu = document.querySelector('.sidebar-menu.menu-open')
      if (openMenu) {
        openMenu.addEventListener('touchstart', preventOverscroll, { passive: false })
        openMenu.addEventListener('touchmove', preventOverscroll, { passive: false })
        openMenu.addEventListener('touchend', preventOverscroll, { passive: false })
      }
    }
  })
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
    
    // Remove scroll listener from scrollable content
    const scrollableContent = document.querySelector('.scrollable-content')
    if (scrollableContent) {
      scrollableContent.removeEventListener('scroll', handleScroll)
    }
    
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    if (stopTimer) {
      clearTimeout(stopTimer)
    }
  })
})
</script>
