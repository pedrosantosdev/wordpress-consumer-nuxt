import sanitizeHtml from 'sanitize-html'
import { sanitizeOptions } from './useHtml.constants'

export function useHtml(el: HTMLElement, binding: { value: string }) {
	el.innerHTML = sanitizeHtml(binding.value, sanitizeOptions)
}
