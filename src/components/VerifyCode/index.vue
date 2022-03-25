<template>
  <div @click="handleClick">
    <canvas ref="verifyCodeRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  modelValue?: null,
  width?: number | string,
  height?: number | string,
  codeLength?: number
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', code: string): void
}>()

const { width = 110, height = 40, codeLength = 4 } = props

const verifyCodeRef = ref<any>(null)
const TEXTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const LINES = 6
const DOTS = 50

let ctx: any

onMounted(() => {
  ctx = (verifyCodeRef as any).value.getContext("2d")
  drawCodeImg()
})

const handleClick = () : void => {
  drawCodeImg()
}

// 绘制验证码
const drawCodeImg = () : void => {
  // 绘制背景
  ctx.fillStyle = randomColor(200, 230)
  ctx.fillRect(0, 0, width, height)

  drawText()
  drawLine()
  drawDot()
}

// 随机数
const randomNum = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min)

// 随机颜色
const randomColor = (min: number, max: number) : string => {
  return `rgb(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(min, max)})`
}

// 绘制文本
const drawText = (): void => {
  let code = ''
  for (let index = 0; index < codeLength; index++) {
    const textIdx = randomNum(0, TEXTS.length)
    const deg = randomNum(-40, 40) // 旋转角度
    const y = randomNum(22, 36) // y方向坐标
    const fontSize = randomNum(20, 30) // 字体大小
    const letter = TEXTS[textIdx]
    ctx.textBaseline = 'alphabetic'
    ctx.font = `${fontSize}px Simhei`
    ctx.fillStyle = randomColor(60, 100)
    ctx.save()
    ctx.translate(10 + index * 26, y)
    ctx.rotate(deg * Math.PI / 180)
    ctx.fillText(letter, 0, 0)
    ctx.restore()
    code += letter
  }

  emit("update:modelValue", code)
}

// 绘制线
const drawLine = (): void => {
  for (let index = 0; index < LINES; index++) {
    const x1 = randomNum(0, ctx.canvas.clientWidth)
    const y1 = randomNum(0, ctx.canvas.clientHeight)
    const x2 = randomNum(0, ctx.canvas.clientWidth)
    const y2 = randomNum(0, ctx.canvas.clientHeight)
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = 1
    ctx.strokeStyle = randomColor(150, 250)
    ctx.stroke()
  }
}

// 绘制点
const drawDot = (): void => {
  for (let index = 0; index < DOTS; index++) {
    const x = randomNum(0, ctx.canvas.clientWidth)
    const y = randomNum(0, ctx.canvas.clientHeight)
    const r = randomNum(1, 2)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = randomColor(100, 200)
    ctx.fill()
  }
}

</script>