
/**
 * 推荐商品
 */
export interface RecommendType {
    recommendId: number;
    recommendDesc: string;
    goodsId: number;
    goodsImage: string;
    goodsPrice: number;
}

/**
 * 分页参数
 */
export interface PageType {
    pageNum: number;
    pageSize: number;
    total: number;
}

/**
 * 商品分类
 */
export interface GoodsCategoryType {
    categoryId: number;
    categoryName: string;
    categoryLevel: number;
    categoryImage: number;
}

/**
 * 商品详情
 */
export interface GoodsType {
  goodsId: number;
  goodsName: string;
  goodsImage: string;
  goodsPrice: number;
  goodsDesc: string;
  goodsDetail?: string;
}

/**
 * 路径参数id
 */
export type PathIdType = number | string | string[]

/**
 * 新增购物车
 */
export interface CartItemAddType {
  goodsId: number;
  goodsCount: number;
}

/**
 * 更新购物车
 */
export interface CartItemUpdateType {
  cartId: number;
  goodsCount: number;
  isDeleted?: boolean;
}

/**
 * 删除购物车
 */
export interface CartItemDeleteType {
  cartIds: number[];
}

/**
 * 购物车项
 */
export interface CartItemType {
  cartId: number;
  goodsId: number;
  goodsName: string;
  goodsDesc: string;
  goodsCount: number;
  goodsPrice: number;
  goodsImage: string;
}

/**
 * 订单生成参数
 */
export interface OrderCreateType {
  cartIds: number[];
  orderCoupon: number;
}

/**
 * 订单商品
 */
export interface OrderGoods {
  orderId: number;
  goodsId: number;
  goodsName: string;
  goodsDesc: string;
  goodsCount: number;
  goodsPrice: number;
  goodsImage: string;
}

/**
 * 更新订单
 */
export interface UpdateOrder {
    orderId: number;
    orderStatus?: number;
    paymentStatus?: number;
    paymentType: number;
    isDeleted?: number;
}

/**
 * 字典项
 */
export interface DictItem {
    name: string;
    value: number | string;
}

/**
 * 订单详情
 */
export interface OrderDetail {
    goodsList?: OrderGoods[];
    orderNo: string;
    orderStatus: number;
    orderPrice: number;
    orderCoupon: number;
    paymentType: number;
    createTime: string;
}

/**
 * 用户地址
 */
export interface AddressType {
    addressId: number;
    userId: string;
    recipient: string;
    phone: string;
    isDefault: number;
    province: string;
    city: string;
    region: string;
    addressDetail: string;
}