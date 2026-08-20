export function useLockScroll(lock = true) {
	const lockClass = 'overflow-hidden'
	const classList = document.body.classList
	if (lock) {
		if (!classList.contains(lockClass)) {
			classList.add(lockClass)
		}
	} else {
		classList.remove(lockClass)
	}
}
