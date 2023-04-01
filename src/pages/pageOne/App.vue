<script lang="ts" setup>
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
  </div>
</template>

<style>
.App {
  font-size: 40px;
  color: red;
}
img {
  width: 100px;
  height: 100px;
}
</style>
