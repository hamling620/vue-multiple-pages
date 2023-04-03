<!-- eslint-disable vue/no-v-model-argument -->
<script lang="ts" setup>
import { ref } from 'vue'
import HelloWorld from './HelloWorld.vue'

const checked = ref(true)
const date = ref('')
const show = ref(false)

const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`
const onConfirm = (value) => {
  show.value = false
  date.value = formatDate(value)
}
</script>

<template>
  <div class="App">
    <van-button type="success">hello wolrd</van-button>
    <van-switch v-model="checked" active-color="#ee0a24"></van-switch>
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model:show="show" @confirm="onConfirm" />
    <HelloWorld />
  </div>
</template>

<style lang="scss" scoped>
.App {
  color: $primaryColor;
}
</style>
