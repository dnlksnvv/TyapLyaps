<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Global app setup
useHead({
  title: 'TyapLyaps - Task Manager',
  meta: [
    { name: 'description', content: 'Универсальный менеджер задач и коллекций' },
    { name: 'theme-color', content: '#1a1a1a' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'TyapLyaps' },
    { name: 'msapplication-TileColor', content: '#1a1a1a' },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-touch-fullscreen', content: 'yes' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
    { name: 'apple-mobile-web-app-orientations', content: 'portrait' },
    { name: 'mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-touch-callout', content: 'no' }
  ],
  link: [
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'apple-touch-icon', href: '/icon-192x192.svg' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    // 🚀 КРИТИЧЕСКИЕ РЕСУРСЫ ДЛЯ БЫСТРОЙ ЗАГРУЗКИ
    { rel: 'preload', href: '/assets/css/main.css', as: 'style' },
    { rel: 'preload', href: '/icon.svg', as: 'image' },
    { rel: 'preload', href: '/icon-192x192.svg', as: 'image' },
    { rel: 'preload', href: '/icon-512x512.svg', as: 'image' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ]
})

// 🚀 МОБИЛЬНЫЕ ОПТИМИЗАЦИИ И GPU УСКОРЕНИЕ
onMounted(() => {
  // Принудительное GPU ускорение для всех элементов
  const allElements = document.querySelectorAll('*')
  allElements.forEach(element => {
    element.style.webkitTransform = 'translate3d(0, 0, 0)'
    element.style.transform = 'translate3d(0, 0, 0)'
    element.style.webkitBackfaceVisibility = 'hidden'
    element.style.backfaceVisibility = 'hidden'
    element.style.webkitFontSmoothing = 'antialiased'
    element.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)'
    element.style.webkitTouchCallout = 'none'
    element.style.webkitUserSelect = 'none'
    element.style.touchAction = 'manipulation'
  })

  // Touch device optimizations - only apply to touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    // Дополнительные оптимизации для touch устройств
    const cards = document.querySelectorAll('.glass-card, .tetris-card')
    cards.forEach(card => {
      card.style.webkitPerspective = '1000'
      card.style.perspective = '1000'
      card.style.willChange = 'transform, opacity'
      card.style.contain = 'layout style paint'
      card.style.isolation = 'isolate'
    })
    
    // Отключаем анимации на мобильных для экономии батареи
    document.body.style.setProperty('--animation-duration', '0s')
    document.body.style.setProperty('--transition-duration', '0s')
  }
  
  // Отключаем параллакс на touch-устройствах для лучшей производительности
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return
  }
  
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