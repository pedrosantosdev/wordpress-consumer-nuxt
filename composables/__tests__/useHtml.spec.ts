import { describe, expect, it } from 'vitest'
import { useHtml } from '../useHtml'

describe('useHtml', () => {
	it('should set sanitized HTML on element', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<p>Hello World</p>' })
		expect(el.innerHTML).toBe('<p>Hello World</p>')
	})

	it('should strip dangerous tags', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<script>alert("xss")</script><p>Safe</p>' })
		expect(el.innerHTML).not.toContain('<script>')
		expect(el.innerHTML).toContain('<p>Safe</p>')
	})

	it('should allow links with href', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<a href="https://example.com">Link</a>' })
		expect(el.innerHTML).toContain('href="https://example.com"')
	})

	it('should allow magnet links', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<a href="magnet:?xt=urn:btih:abc123">Magnet</a>' })
		expect(el.innerHTML).toContain('magnet:?xt=urn:btih:abc123')
	})

	it('should allow images with src', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<img src="https://example.com/image.png" width="100" height="100">' })
		expect(el.innerHTML).toContain('src="https://example.com/image.png"')
	})

	it('should strip event handlers from elements', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<a href="https://example.com" onclick="alert(1)">Link</a>' })
		expect(el.innerHTML).not.toContain('onclick')
	})

	it('should handle empty content', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '' })
		expect(el.innerHTML).toBe('')
	})

	it('should allow headings', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<h1>Title</h1><h2>Subtitle</h2>' })
		expect(el.innerHTML).toContain('<h1>Title</h1>')
		expect(el.innerHTML).toContain('<h2>Subtitle</h2>')
	})

	it('should allow lists', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<ul><li>Item 1</li><li>Item 2</li></ul>' })
		expect(el.innerHTML).toContain('<li>Item 1</li>')
	})

	it('should allow tables', () => {
		const el = document.createElement('div')
		useHtml(el, { value: '<table><tr><td>Cell</td></tr></table>' })
		expect(el.innerHTML).toContain('<td>Cell</td>')
	})
})
