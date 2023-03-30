import '@/assets/scss/index.scss'
import image from '@/assets/images/girl.jpeg'

console.log('pageOne')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const img = new Image()
img.src = image
document.querySelector('#app').appendChild(img)

const add = (a, b) => a + b
console.log(add(10, 20))

const ulEl = document.createElement('ul')
const fragment = document.createDocumentFragment()
for (let i = 0; i < 3; i++) {
  const liEl = document.createElement('li')
  liEl.innerHTML = i + 1
  fragment.appendChild(liEl)
}
ulEl.appendChild(fragment)
document.querySelector('#app').appendChild(ulEl)
