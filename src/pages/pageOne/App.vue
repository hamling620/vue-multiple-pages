<script setup>
  import { reactive } from 'vue'
  import imageUrl from '@/assets/images/girl.jpeg'
  const state = reactive({
    name: ''
  })
</script>

<template>
  <div class="App">
    <img :src="imageUrl" alt="">
    {{  state.name }}
    <input type="text" v-model="state.name">
    111222
  </div>
</template>

<style lang="scss" scoped>
.App {
  font-size: 40px;
  color: $primaryColor;
}
img {
  width: 100px;
  height: 100px;
}
</style>
