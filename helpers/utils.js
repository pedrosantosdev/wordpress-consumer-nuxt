export function debounce(fn, delay) {
  let timeoutID = null
  return () => {
    clearTimeout(timeoutID)
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
