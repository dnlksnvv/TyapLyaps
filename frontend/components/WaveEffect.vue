<template>
  <div class="water-container">
    <div 
      class="water-level"
      :style="{ height: `${progress}%` }"
    >
      <!-- Dynamic fill background -->
      <div 
        class="water-fill"
        :style="{ backgroundColor: getWaveColor(progress) }"
      ></div>
      
      <!-- SVG with wave on top -->
      <svg class="wave-svg" viewBox="0 -50 100 70" preserveAspectRatio="none">
        <path 
          class="sine-wave-fill"
          :d="generateRealTimeWave(progress)"
          :fill="getWaveColor(progress)"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Props
interface Props {
  progress: number
}

const props = defineProps<Props>()

// Reactive data
const waveTime = ref(0)

// Methods
const generateRealTimeWave = (progress: number) => {
  // Чем меньше прогресс, тем больше амплитуда и больше гармоник
  const baseAmplitude = Math.max(1, 1 + (100 - progress) / 100 * 8) // от 9 до 1
  const baseFrequency = 1 + (100 - progress) / 100 * 4 // от 5 до 1
  const speed = 2 + (100 - progress) / 100 * 1 // скорость волны
  const width = 100 // ширина блока
  const height = 20 // высота SVG
  const centerY = -20 // центр волны поднят вверх
  
  // Количество гармоник зависит от прогресса (меньше прогресс = больше гармоник)
  const numHarmonics = Math.max(1, Math.floor(1 + (100 - progress) / 100 * 14)) // от 15 до 1
  
  // Динамический цвет на основе прогресса
  const red = Math.floor(255 * (100 - progress) / 100) // от 255 до 0
  const green = Math.floor(255 * progress / 100) // от 0 до 255
  const blue = Math.floor(100 + (100 - progress) / 100 * 50) // от 150 до 100
  const color = `rgb(${red}, ${green}, ${blue})`
  
  // Начинаем с левого нижнего угла
  let path = `M0,${height}`
  
  // Генерируем полигармоническую волну в реальном времени
  for (let x = 0; x <= width; x += 1) {
    const time = waveTime.value * speed
    let y = centerY
    
    // Складываем несколько гармоник
    for (let h = 1; h <= numHarmonics; h++) {
      const harmonicAmplitude = baseAmplitude / h // амплитуда убывает с номером гармоники
      const harmonicFrequency = baseFrequency * h // частота растет с номером гармоники
      
      // Детерминированная фаза для каждой гармоники (не случайная)
      const phaseOffset = h * 0.5 // каждая гармоника имеет свою фазу
      const phase = (x / width) * Math.PI * 2 * harmonicFrequency + time + phaseOffset
      
      // Используем разные функции для разных гармоник
      let waveValue = 0
      if (h % 4 === 1) {
        waveValue = Math.sin(phase)
      } else if (h % 4 === 2) {
        waveValue = Math.cos(phase)
      } else if (h % 4 === 3) {
        waveValue = Math.sin(phase) * Math.cos(phase)
      } else {
        waveValue = Math.sin(phase) + Math.cos(phase * 1.5)
      }
      
      // Добавляем детерминированный шум (на основе позиции и времени)
      const noisePhase = (x / width) * Math.PI * 4 + time * 2
      const noise = (100 - progress) / 100 * Math.sin(noisePhase) * 0.5
      
      y += waveValue * harmonicAmplitude + noise
    }
    
    path += ` L${x},${y}`
  }
  
  // Закрываем область справа вниз
  path += ` L${width},${height}`
  
  // Закрываем область слева вверх
  path += ` Z`
  
  return path
}

const getWaveColor = (progress: number) => {
  // Динамический цвет на основе прогресса
  // 0% = яркий красный, 50% = яркий желтый, 100% = яркий зеленый
  let red, green, blue
  
  if (progress <= 50) {
    // От яркого красного к яркому желтому (0-50%)
    const ratio = progress / 50
    red = 255
    green = Math.floor(255 * ratio) // от 0 до 255
    blue = 0
  } else {
    // От яркого желтого к яркому зеленому (50-100%)
    const ratio = (progress - 50) / 50
    red = Math.floor(255 * (1 - ratio)) // от 255 до 0
    green = 255
    blue = 0
  }
  
  const alpha = 0.2
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

// Lifecycle
onMounted(() => {
  const updateWave = () => {
    waveTime.value = Date.now() / 1000
    requestAnimationFrame(updateWave)
  }
  updateWave()
})
</script>
