export default function (lock = true) {
  const lockClass = 'overflow-hidden'
  const classList = document.body.classList
  if (!classList.contains(lockClass) && lock) {
    return document.body.classList.add(lockClass)
  }
  return document.body.classList.remove(lockClass)
}
