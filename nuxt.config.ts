// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-10-16',
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  // Агрессивная оптимизация Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: false
  },
  typescript: {
    strict: true
  },
  // Оптимизация для мобильных устройств
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  vite: {
    build: {
      cssCodeSplit: false, // Объединяем CSS в один файл для быстрой загрузки
      minify: 'terser', // Используем terser для лучшего сжатия
      terserOptions: {
        compress: {
          drop_console: true, // Удаляем console.log в production
          drop_debugger: true, // Удаляем debugger
          pure_funcs: ['console.log', 'console.info', 'console.debug'], // Удаляем console функции
          passes: 2, // Двойное сжатие
          unsafe: true, // Агрессивное сжатие
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_proto: true
        },
        mangle: {
          toplevel: true // Меняем имена переменных
        }
      },
      rollupOptions: {
        output: {
          manualChunks: undefined, // Отключаем разделение на чанки для мобильных
          compact: true, // Сжимаем вывод
          generatedCode: {
            constBindings: true // Используем const вместо let
          },
          // Отключаем source maps
          sourcemap: false
        }
      },
      chunkSizeWarningLimit: 1000, // Предупреждение при размере чанка > 1MB
      target: 'es2015' // Целевая версия ES для лучшего сжатия
    },
    esbuild: {
      drop: ['console', 'debugger'] // Удаляем console и debugger
    }
  },
  // Агрессивное кеширование для мобильных
  experimental: {
    payloadExtraction: false // Отключаем извлечение payload для экономии места
  },
  // Дополнительные оптимизации для мобильных
  build: {
    analyze: false // Отключаем анализ бандла для экономии места
  },
  // Отключаем dev tools в production
  devtools: { enabled: false },
  // Отключаем source maps для уменьшения размера
  sourcemap: false,
  // Отключаем dev сервер
  dev: false,
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        // Кеширование страниц на 10+ секунд
        {
          urlPattern: /^\/.*$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'pages-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 // 30 секунд кеширования страниц
            }
          }
        },
        // Кеширование статических ресурсов
        {
          urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|ico)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-resources-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7 дней
            }
          }
        },
        // Кеширование API запросов
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 год
            }
          }
        }
      ],
      // Агрессивные настройки для мобильных
      skipWaiting: true,
      clientsClaim: true,
      offlineGoogleAnalytics: false,
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 5MB лимит кеша
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})
