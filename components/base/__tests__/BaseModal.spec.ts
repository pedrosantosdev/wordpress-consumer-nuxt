import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseModalVue from '@/components/base/BaseModal.vue'

describe('BaseModalVue', () => {
	it('should render properly', () => {
		render(BaseModalVue, {
			props: {
				showModal: true,
			},
			slots: { default: '<div>Conteudo Bacana</div>' },
			global: {
				stubs: {
					NuxtIcon: true,
				},
			},
		})
		expect(document.body).toMatchSnapshot()
	})
})
