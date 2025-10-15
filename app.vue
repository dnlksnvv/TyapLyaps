<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Global app setup
useHead({
  title: 'TyapLyaps - Учебный Дашборд',
  meta: [
    { name: 'description', content: 'Интерактивный дашборд для отслеживания учебного прогресса' },
    { name: 'theme-color', content: '#0a0a0a' }
  ]
})

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