import debounce from '@/helpers/debounce'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy-scroll', (el, binding) => {
    const callback = binding.value.callback
    if (callback === undefined) return
    const heightPercent = binding.value.heightPercent ?? 60
    const debounceTime = binding.value.debounceTime ?? 100
    const handleScroll = debounce(() => {
      const targetHeight = Math.floor(
        (el.getBoundingClientRect().height * heightPercent) / 100
      )
      const currentHeightScroll = Math.abs(el.getBoundingClientRect().y)
      if (
        el.getBoundingClientRect().bottom < window.innerHeight ||
        targetHeight <= currentHeightScroll
      ) {
        callback()
      }
    }, debounceTime)

    if (el.getBoundingClientRect().height > window.innerHeight) {
      window.addEventListener('scroll', handleScroll)
    }
    tryOnUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  })
})
