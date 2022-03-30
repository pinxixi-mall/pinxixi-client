import { DictItem } from "@/types"

/**
 * 订单状态
 */
export const orderStatusList: DictItem[] = [
    { name: '待支付', value: 0 },
    { name: '待收货', value: 1 },
    { name: '交易成功', value: 2 },
    { name: '手动关闭', value: 3 },
    { name: '超时关闭', value: 4 },
    { name: '商家关闭', value: 5 },
    { name: '已删除', value: 99 },
]
/**
 * 支付状态
 */
export const paymentStatusList: DictItem[] = [
    { name: '未支付', value: 0 },
    { name: '支付成功', value: 1 },
    { name: '支付失败', value: 2 },
]
/**
 * 支付方式
 */
export const paymentTypeList: DictItem[] = [
    { name: '支付宝', value: 1 },
    { name: '微信', value: 2 },
]
