export const TOKEN_KEY = 'ACCESS_TOKEN_CLIENT'

// 未登录
export const NOT_LOGIN = 401

// token失效
export const TOKEN_EXPIRED = 4001

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'api' : ''

// 项目模拟地址
export const MOCK_BASE_URL = ''

// 请求超时时间 10秒
export const TIMEOUT = 10000

// 最小购买数量
export const PURCHASE_QUANTITY_MIN = 1

// 最大购买数量
export const PURCHASE_QUANTITY_MAX = 99

// 商品价格小数位
export const PRICE_DECIMAL = 2