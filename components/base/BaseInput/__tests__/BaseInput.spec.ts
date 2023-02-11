import { render } from '@testing-library/vue'
import BaseInputVue from '@/components/base/BaseInput/BaseInput.vue'

describe('BaseInputVue', () => {
  it('should render properly', () => {
    const wrapper = render(BaseInputVue, {
      props: {
        label: 'Type Here',
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
