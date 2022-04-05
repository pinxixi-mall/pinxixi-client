/**
 * 优惠券配置
 */
export default [
  {
    available: 1,
    reason: '',
    value: 30000, // valueDesc * 100
    name: '拼西西千亿补贴',
    condition: '无门槛',
    startAt: Date.now() / 1000,
    endAt: Date.now() / 1000 + 7 * 24 * 60 * 60,
    valueDesc: '300',
    unitDesc: '元'
  },
  {
    available: 1,
    reason: '',
    value: 900, // valueDesc * 100
    name: '天降红包',
    condition: '满39可用',
    startAt: Date.now() / 1000,
    endAt: Date.now() / 1000 + 7 * 24 * 60 * 60,
    valueDesc: '9',
    unitDesc: '元'
  }
]
