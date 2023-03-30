import '@/assets/scss/index.scss'
import imageUrl from '@/assets/images/girl.jpeg'
import { add } from '@/math'

console.log('pageOne')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const img = new Image()
img.src = imageUrl
document.querySelector('#app').appendChild(img)

console.log(add(10, 20))
