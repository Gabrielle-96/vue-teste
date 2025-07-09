<script setup lang="ts">
import QuantidadeCarrinho from '@/components/QuantidadeCarrinho.vue'
import TheTimer from './TheTimer.vue';

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-hero">
      <div class="welcome-animation">
        <div class="floating-icon">👋</div>
      </div>
      
      <h1 class="welcome-title">{{ msg }}</h1>
      
      <div class="welcome-subtitle">
        <p>Bem-vindo(a) ao Vue Lab!</p>
        <p class="tech-stack">
          Criado com 
          <a href="https://vitejs.dev/" target="_blank" rel="noopener" class="tech-link">
            <span class="tech-icon">⚡</span>
            Vite
          </a> + 
          <a href="https://vuejs.org/" target="_blank" rel="noopener" class="tech-link">
            <span class="tech-icon">💚</span>
            Vue 3
          </a>
        </p>
      </div>
    </div>

    <div class="welcome-features">
      <div class="feature-card">
        <div class="feature-icon">🛒</div>
        <h3 class="feature-title">Contador de Quantidade</h3>
        <div class="component-wrapper">
          <QuantidadeCarrinho/>
        </div>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">⏱️</div>
        <h3 class="feature-title">Contador de Tempo</h3>
        <div class="component-wrapper">
          <TheTimer/>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.welcome-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-animation {
  margin-bottom: 2rem;
}

.floating-icon {
  font-size: 4rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.welcome-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.welcome-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.tech-stack {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.tech-link {
  color: #fff;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0 0.2rem;
}

.tech-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.tech-icon {
  font-size: 1rem;
}

.welcome-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  width: 100%;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: white;
  opacity: 0.9;
}

.component-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
}

/* Ajustes específicos para o componente Quantidade dentro do card */
.component-wrapper :deep(.counter-container) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: 0;
}

.component-wrapper :deep(.counter-label) {
  color: white;
  opacity: 0.9;
}

.component-wrapper :deep(.counter-input) {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #374151;
}

.component-wrapper :deep(.counter-input:focus) {
  background: white;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.component-wrapper :deep(.counter-btn) {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.component-wrapper :deep(.counter-btn--increment:hover:not(:disabled)) {
  background: rgba(16, 185, 129, 0.3);
}

.component-wrapper :deep(.counter-btn--decrement:hover:not(:disabled)) {
  background: rgba(239, 68, 68, 0.3);
}

.component-wrapper :deep(.counter-btn:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
}

/* Responsividade */
@media (max-width: 768px) {
  .welcome-container {
    padding: 1rem;
  }
  
  .welcome-title {
    font-size: 2.5rem;
  }
  
  .welcome-subtitle {
    font-size: 1.1rem;
  }
  
  .welcome-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-features {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 1rem;
    min-height: 300px;
  }
}
</style>