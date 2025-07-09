<template>
  <div class="timer-container">
    <div class="timer-header">
      <h2 class="timer-title">Contador de Tempo</h2>
      <div class="timer-status" :class="statusClass">
        <span class="status-indicator"></span>
        {{ statusText }}
      </div>
    </div>

    <div class="timer-display">
      <div class="time-segment">
        <span class="time-value">{{ formattedTime.hours }}</span>
        <span class="time-label">Horas</span>
      </div>
      <div class="time-separator">:</div>
      <div class="time-segment">
        <span class="time-value">{{ formattedTime.minutes }}</span>
        <span class="time-label">Minutos</span>
      </div>
      <div class="time-separator">:</div>
      <div class="time-segment">
        <span class="time-value">{{ formattedTime.seconds }}</span>
        <span class="time-label">Segundos</span>
      </div>
    </div>

    <div class="timer-controls">
      <button 
        @click="startTimer"
        :disabled="isRunning"
        class="timer-btn timer-btn--start"
        aria-label="Iniciar contador"
      >
        <span class="btn-icon">▶️</span>
        <span class="btn-text">Iniciar</span>
      </button>

      <button 
        @click="pauseTimer"
        :disabled="!isRunning"
        class="timer-btn timer-btn--pause"
        aria-label="Pausar contador"
      >
        <span class="btn-icon">⏸️</span>
        <span class="btn-text">Pausar</span>
      </button>

      <button 
        @click="stopTimer"
        :disabled="!isRunning && totalSeconds === 0"
        class="timer-btn timer-btn--stop"
        aria-label="Parar contador"
      >
        <span class="btn-icon">⏹️</span>
        <span class="btn-text">Parar</span>
      </button>

      <button 
        @click="resetTimer"
        :disabled="totalSeconds === 0"
        class="timer-btn timer-btn--reset"
        aria-label="Reiniciar contador"
      >
        <span class="btn-icon">🔄</span>
        <span class="btn-text">Reiniciar</span>
      </button>
    </div>

    <div class="timer-info">
      <div class="info-item">
        <span class="info-label">Tempo total decorrido:</span>
        <span class="info-value">{{ formatTotalTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

// Estado reativo
const totalSeconds = ref(0)
const isRunning = ref(false)
const intervalId = ref<number | null>(null)

// Computed para formatação do tempo
const formattedTime = computed(() => {
  const hours = Math.floor(totalSeconds.value / 3600)
  const minutes = Math.floor((totalSeconds.value % 3600) / 60)
  const seconds = totalSeconds.value % 60

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
})

// Computed para o tempo total formatado
const formatTotalTime = computed(() => {
  const hours = Math.floor(totalSeconds.value / 3600)
  const minutes = Math.floor((totalSeconds.value % 3600) / 60)
  const seconds = totalSeconds.value % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
})

// Computed para status
const statusClass = computed(() => ({
  'status--running': isRunning.value,
  'status--paused': !isRunning.value && totalSeconds.value > 0,
  'status--stopped': !isRunning.value && totalSeconds.value === 0
}))

const statusText = computed(() => {
  if (isRunning.value) return 'Em execução'
  if (totalSeconds.value > 0) return 'Pausado'
  return 'Parado'
})

// Métodos
const startTimer = () => {
  if (isRunning.value) return
  
  isRunning.value = true
  intervalId.value = setInterval(() => {
    totalSeconds.value++
  }, 1000)
}

const pauseTimer = () => {
  if (!isRunning.value) return
  
  isRunning.value = false
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

const stopTimer = () => {
  pauseTimer()
}

const resetTimer = () => {
  pauseTimer()
  totalSeconds.value = 0
}

// Cleanup ao desmontar o componente
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<style scoped>
.timer-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.timer-header {
  text-align: center;
  margin-bottom: 2rem;
}

.timer-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.timer-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  transition: all 0.3s ease;
}

.status--running .status-indicator {
  background: #10b981;
  animation: pulse 2s infinite;
}

.status--paused .status-indicator {
  background: #f59e0b;
}

.status--stopped .status-indicator {
  background: #6b7280;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.time-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.time-value {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  font-family: 'Courier New', monospace;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-label {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 0.5rem;
  font-weight: 500;
}

.time-separator {
  font-size: 2.5rem;
  font-weight: 700;
  opacity: 0.7;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 0.7; }
  51%, 100% { opacity: 0.3; }
}

.timer-controls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.timer-btn {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 56px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.timer-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.timer-btn:not(:disabled):active {
  transform: translateY(0);
}

.timer-btn--start {
  background: rgba(16, 185, 129, 0.2);
  color: white;
}

.timer-btn--start:not(:disabled):hover {
  background: rgba(16, 185, 129, 0.3);
}

.timer-btn--pause {
  background: rgba(245, 158, 11, 0.2);
  color: white;
}

.timer-btn--pause:not(:disabled):hover {
  background: rgba(245, 158, 11, 0.3);
}

.timer-btn--stop {
  background: rgba(239, 68, 68, 0.2);
  color: white;
}

.timer-btn--stop:not(:disabled):hover {
  background: rgba(239, 68, 68, 0.3);
}

.timer-btn--reset {
  background: rgba(107, 114, 128, 0.2);
  color: white;
}

.timer-btn--reset:not(:disabled):hover {
  background: rgba(107, 114, 128, 0.3);
}

.timer-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-text {
  font-size: 0.9rem;
}

.timer-info {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.info-label {
  opacity: 0.8;
}

.info-value {
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

/* Responsividade */
@media (max-width: 768px) {
  .timer-container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .timer-title {
    font-size: 1.5rem;
  }
  
  .time-value {
    font-size: 2.5rem;
  }
  
  .time-separator {
    font-size: 2rem;
  }
  
  .timer-controls {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .timer-display {
    gap: 0.5rem;
    padding: 1.5rem;
  }
  
  .time-segment {
    min-width: 60px;
  }
  
  .time-value {
    font-size: 2rem;
  }
  
  .time-separator {
    font-size: 1.5rem;
  }
  
  .timer-btn {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
  
  .info-item {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>