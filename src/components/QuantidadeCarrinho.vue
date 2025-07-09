<template>
  <div class="counter-container">
    <div class="counter-header">
      <label for="qtd" class="counter-label">Quantidade</label>
    </div>
    
    <div class="counter-controls">
      <button 
        id="decrementar" 
        @click="decrementar"
        class="counter-btn counter-btn--decrement"
        :disabled="quantidade <= 0"
      >
        <span class="counter-btn__icon">−</span>
      </button>
      
      <div class="counter-display">
        <input 
          id="qtd"
          type="number" 
          v-model="quantidade" 
          class="counter-input"
          min="0"
        />
      </div>
      
      <button 
        id="incrementar" 
        @click="incrementar"
        class="counter-btn counter-btn--increment"
      >
        <span class="counter-btn__icon">+</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const quantidade = ref(0)
    
    const incrementar = () => {
      quantidade.value += 1
    }
    
    const decrementar = () => {
      if (quantidade.value > 0) {
        quantidade.value -= 1
      }
    }
    
    return {
      quantidade,
      incrementar,
      decrementar
    }
  }
})
</script>

<style scoped>
.counter-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.counter-header {
  text-align: center;
  margin-bottom: 20px;
}

.counter-label {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  display: block;
}

.counter-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.counter-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.counter-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.counter-btn:active:not(:disabled) {
  transform: translateY(0);
}

.counter-btn--increment {
  background: #10b981;
  color: white;
}

.counter-btn--increment:hover:not(:disabled) {
  background: #059669;
}

.counter-btn--decrement {
  background: #ef4444;
  color: white;
}

.counter-btn--decrement:hover:not(:disabled) {
  background: #dc2626;
}

.counter-btn:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.counter-btn__icon {
  line-height: 1;
}

.counter-display {
  display: flex;
  align-items: center;
}

.counter-input {
  width: 80px;
  height: 48px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  transition: all 0.2s ease;
}

.counter-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.counter-input::-webkit-outer-spin-button,
.counter-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.counter-input[type=number] {
  -moz-appearance: textfield;
}

/* Responsividade */
@media (max-width: 480px) {
  .counter-container {
    margin: 16px;
    padding: 20px;
  }
  
  .counter-btn {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
  
  .counter-input {
    width: 70px;
    height: 44px;
    font-size: 16px;
  }
}
</style>