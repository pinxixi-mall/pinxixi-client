export const TOKEN_KEY = 'ACCESS_TOKEN_CLIENT'

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'api' : ''

/**
 * 请求超时时间
 */
export const TIMEOUT = 10000

/**
 * 最小购买数量
 */
export const PURCHASE_QUANTITY_MIN = 1

/**
 * 最大购买数量
 */
export const PURCHASE_QUANTITY_MAX = 99

/**
 * 商品价格小数位
 */
export const PRICE_DECIMAL = 2
