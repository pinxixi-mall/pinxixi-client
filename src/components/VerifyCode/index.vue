<template>
  <div>
    <canvas ref="verifyCodeRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'

const props = defineProps({
  width: Number,
  height: Number,
  codeLength: Number
})

const { width = 110, height = 46, codeLength = 4 } = props

const verifyCodeRef = ref(null)
const texts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

let ctx

onMounted(() => {
  ctx = verifyCodeRef.value.getContext("2d")
  drawCodeImg()
})

// 绘制验证码
const drawCodeImg = () : void => {
  // 绘制背景
  ctx.fillStyle = randomColor(200, 230)
  ctx.fillRect(0, 0, width, height)
  // ctx.save()

  drawText()
}

// 随机颜色
const randomColor = (min: number, max: number) : string => {
  return `rgb(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(min, max)})`
}

// 随机数
const randomNum = (min, max): number => Math.floor(Math.random() * (max - min) + min)

// 绘制文本
const drawText = (): void => {
  for (let index = 0; index < codeLength; index++) {
    const textIdx = randomNum(0, texts.length)
    console.log('------log------', texts[textIdx])
    ctx.font = '30px'
    ctx.fillText(texts[textIdx], 50, 20)
  }
}

// 绘制线
const drawLine = (): void => {

}

</script>

<style scoped>

</style>