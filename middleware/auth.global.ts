export default defineNuxtRouteMiddleware((to) => {
  if (to.name !== 'login' && !useBaseAuth().isAuth) {
    return navigateTo('/login')
  }
})
