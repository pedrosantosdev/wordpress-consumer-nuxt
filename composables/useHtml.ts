import sanitizeHtml from 'sanitize-html'

export default function (el: HTMLElement, binding: { value: string }) {
	// Customize your own options, refer to documentation
	const options = {
		allowedTags: [
			// Headers
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			// Paragraph / Line-breaks
			'p',
			'br',
			// Anhor
			'a',
			// Image
			'img',
			// List
			'ol',
			'ul',
			'li',
			// Table
			'table',
			'tbody',
			'caption',
			'tr',
			'th',
			'td',
			// Misc
			'div',
			'span',
		],
		allowedAttributes: {
			h1: ['id'],
			h2: ['id'],
			h3: ['id'],
			h4: ['id'],
			h5: ['id'],
			h6: ['id'],
			p: ['id'],
			a: ['href', 'target'],
			img: ['src', 'width', 'height'],
			div: ['id', 'class'],
		},
		allowedClasses: {
			'*': ['*'],
		},
		nonBooleanAttributes: ['*'],
		allowedSchemes: ['data', 'http', 'https', 'magnet'],
	}
	el.innerHTML = sanitizeHtml(binding.value, options)
}
