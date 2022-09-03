import debounce from '@/helpers/debounce'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll', (el, binding) => {
    const callback = binding.value.callback
    if (!callback) return
    const heightPercent = binding.value.heightPercent ?? 60
    const handleScroll = debounce(() => {
      const targetHeight = Math.floor(
        (el.getBoundingClientRect().height * heightPercent) / 100
      )
      const currentHeightScroll = Math.abs(el.getBoundingClientRect().y)
      if (
        el.getBoundingClientRect().bottom < window.innerHeight ||
        targetHeight <= currentHeightScroll
      ) {
        console.log('s')
        callback()
      }
    }, 50)

    if (el.getBoundingClientRect().height > 0) {
      window.addEventListener('scroll', handleScroll)
    }
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  })
})
