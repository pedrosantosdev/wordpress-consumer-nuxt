export function debounce(fn, delay) {
  let timeoutID = null
  return  () => {
    clearTimeout(timeoutID)
    const args = arguments
    const that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
