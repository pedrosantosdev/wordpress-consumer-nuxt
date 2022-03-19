import { mount } from '@vue/test-utils'
import BaseDefaultCardVue from '@/components/base/card/BaseDefaultCard.vue'

describe('BaseDefaultCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(BaseDefaultCardVue)
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
})
