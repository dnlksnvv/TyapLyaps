<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="text-center max-w-md mx-auto">
      <!-- Offline Icon -->
      <div class="mb-8">
        <svg class="w-24 h-24 mx-auto text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      </div>
      
      <!-- Title -->
      <h1 class="text-3xl font-bold text-white mb-4">Нет подключения</h1>
      
      <!-- Description -->
      <p class="text-white/70 mb-8 leading-relaxed">
        Проверьте подключение к интернету и попробуйте снова. 
        Некоторые функции могут быть доступны в оффлайн режиме.
      </p>
      
      <!-- Retry Button -->
      <button 
        @click="retryConnection"
        class="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
      >
        Попробовать снова
      </button>
      
      <!-- Offline Features -->
      <div class="mt-12 text-left">
        <h3 class="text-lg font-semibold text-white mb-4">Доступно оффлайн:</h3>
        <ul class="space-y-2 text-white/60">
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Просмотр сохраненных задач
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Редактирование коллекций
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Календарь задач
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Навигация по приложению
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use default layout
definePageMeta({
  layout: 'default'
})

const retryConnection = () => {
  if (navigator.onLine) {
    // Если соединение восстановлено, перенаправляем на главную
    window.location.href = '/'
  } else {
    // Если все еще оффлайн, перезагружаем страницу
    window.location.reload()
  }
}

// Проверяем статус соединения
onMounted(() => {
  const handleOnline = () => {
    window.location.href = '/'
  }
  
  const handleOffline = () => {
    // Страница уже показывает оффлайн состояние
  }
  
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  onUnmounted(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })
})
</script>

<style scoped>
/* Стили для оффлайн страницы */
</style>
