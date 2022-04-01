import http from '@/request'
import {
  CartItemAddType,
  CartItemDeleteType,
  CartItemUpdateType,
  OrderCreateType,
  PathIdType,
  UpdateAddress,
  UpdateOrder,
  Address,
  QueryId,
  PageType,
  UserInfo
} from '@/types'
import { OptionsType } from '@/request/types'

// 登录
export const login = (data: any) =>
  http.post({
    url: `/client/user/login`,
    data
  })

// 注册
export const register = (data: any) =>
  http.post({
    url: `/client/user/register`,
    data
  })

// 用户信息
export const getUserInfo = (options?: OptionsType) =>
  http.get({
    url: `/client/user`,
    data: null,
    options
  })

// 修改用户信息
export const updateUserInfo = (data: UserInfo) =>
  http.put({
    url: `/client/user`,
    data: data,
  })

// 退出登录
export const logout = () =>
  http.post({
    url: `/client/user/logout`
  })

// 首页轮播
export const getHomeCarousel = (data?: any) =>
  http.get({
    url: `/client/home/carousel`,
    params: data
  })

// 首页推荐
export const getRecommendList = (data: any) =>
  http.get({
    url: `/client/home/recommend`,
    params: data
  })

// 商品分类
export const getGoodsCategory = (data?: any) =>
  http.get({
    url: `/client/goods/category`,
    params: data
  })

// 商品分类（树形）
export const getGoodsCategoryTree = (data?: any) =>
  http.get({
    url: `/client/goods/category/tree`,
    params: data
  })

// 商品详情
export const getGoodsDetail = (id: PathIdType) =>
  http.get({
    url: `/client/goods/detail/${id}`
  })

// 加入购物车
export const addCart = (data: CartItemAddType) =>
  http.post({
    url: `/client/cart`,
    data
  })

// 更新购物车
export const updateCart = (data: CartItemUpdateType) =>
  http.put({
    url: `/client/cart`,
    data
  })

// 删除购物车
export const deleteCart = (data: CartItemDeleteType) =>
  http.delete({
    url: `/client/cart`,
    data
  })

// 按用户查询购物车列表
export const getCartList = (options?: OptionsType) =>
  http.get({
    url: `/client/cart`,
    data: null,
    options
  })

// 按ids查询购物车列表
export const getCartListByIds = (ids: Record<string, string>, options?: OptionsType) =>
  http.get({
    url: `/client/cart/select`,
    params: ids,
    options
  })

// 提交订单
export const createOrder = (data: OrderCreateType) =>
  http.post({
    url: `/client/order`,
    data: data
  })

// 订单详情
export const getOrder = (orderId: number) =>
  http.get({
    url: `/client/order/${orderId}`
  })

// 更新订单（支付，发货，关闭，删除）
export const updateOrder = (data: UpdateOrder) =>
  http.put({
    url: `/client/order`,
    data
  })

// 订单列表
export const getOrderList = (data: PageType, options?: OptionsType) =>
  http.get({
    url: `/client/order/list`,
    params: data,
    options
  })

// 用户地址列表
export const getAddress = () =>
  http.get({
    url: `/client/address`
  })

// 用户地址
export const getAddressById = (id: QueryId) =>
  http.get({
    url: `/client/address/${id}`
  })

// 默认地址
export const getDefaultAddress = () =>
  http.get({
    url: `/client/address/default`
  })

// 添加地址
export const addAddress = (data: Omit<Address, 'addressId'>) =>
  http.post({
    url: `/client/address`,
    data
  })

// 更新地址
export const updateAddress = (data: Partial<Address>) =>
  http.put({
    url: `/client/address`,
    data
  })

// 删除地址
export const deleteAddress = (id: number) =>
  http.delete({
    url: `/client/address/${id}`,
  })