import { LocationQueryValue } from "vue-router";

/**
 * 用户信息
 */
export interface UserInfo {
    userName: string;
    nickName: string;
    phone: string;
    email: string;
    avatar: string;
}

/**
 * 密码重置
 */
 export interface PasswordReset {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

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
    [x: string]: any;
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
 * 路径参数id
 */
 export type QueryId = number| LocationQueryValue | LocationQueryValue[]

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
  addressId: number | undefined;
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
    orderId: number;
    orderNo: string;
    addressId: number;
    orderStatus: number;
    orderPrice: number;
    orderCoupon: number;
    paymentType: number;
    createTime: string;
}

/**
 * 用户地址
 */
export interface Address {
    addressId: number;
    userId: string;
    name: string;
    tel: string;
    isDefault: number;
    province: string;
    provinceCode: string;
    city: string;
    cityCode: string;
    county: string;
    countyCode: string;
    addressDetail: string;
    [x: string]: any;
}

/**
 * 更新用户地址
 */
 export interface UpdateAddress {
    addressId: number;
    name?: string;
    tel?: string;
    isDefault?: number | boolean;
    province?: string;
    provinceCode?: string;
    city?: string;
    cityCode?: string;
    county?: string;
    countyCode?: string;
    addressDetail?: string;
}