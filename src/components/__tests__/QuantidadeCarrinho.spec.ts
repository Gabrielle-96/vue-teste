import { mount } from '@vue/test-utils'
import QuantidadeCarrinho from '@/components/QuantidadeCarrinho.vue'
import { describe, expect, test } from 'vitest'

describe('QuantidadeCarrinho', () => {
  test('aumenta a quantidade em um ao clicar no btn +', async () => {
    const wrapper = mount(QuantidadeCarrinho)
    await wrapper.find('#incrementar').trigger('click')
    const input = wrapper.find('input')
    const quantidade = input.element.value
    expect(quantidade).toBe('1')
  })
  test('aumenta a quantidade em um ao clicar no btn +, inciando com valor diferente de 0', async () => {
    const wrapper = mount(QuantidadeCarrinho)
    const input = wrapper.find('input')
    input.setValue('27')
    await wrapper.find('#incrementar').trigger('click')
    const quantidade = input.element.value
    expect(quantidade).toBe('28')
  })
  test('dimunui a quantidade em um ao clicar no btn -, com valor diferente de 0', async () => {
    const wrapper = mount(QuantidadeCarrinho)
    const input = wrapper.find('input')
    input.setValue('26')
    await wrapper.find('#decrementar').trigger('click')
    const quantidade = input.element.value
    expect(quantidade).toBe('25')
  })
  test('dimunui a quantidade em um ao clicar no btn -', async () => {
    const wrapper = mount(QuantidadeCarrinho)
    await wrapper.find('#decrementar').trigger('click')
    const input = wrapper.find('input')
    const quantidade = input.element.value
    expect(quantidade).toBe('0')
  })
})
