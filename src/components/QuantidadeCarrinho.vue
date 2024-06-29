<template>
  <div>
    <label for="qtd">Quantidade</label>
    <input type="number" v-model="quantidade" />
    <button id="incrementar" @click="incrementar">+ 1</button>
    <button id="decrementar" @click="decrementar">- 1</button>
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
