import http from '@/request'
import { CartItemAddType, CartItemDeleteType, CartItemUpdateType, PathIdType } from '@/types'

// 登录
export const login = (data: any) => http.post({
    url: `/client/login`,
    data
})

// 注册
export const register = (data: any) => http.post({
    url: `/client/register`,
    data
})

// 首页轮播
export const getHomeCarousel = (data?: any) => http.get({
    url: `/client/home/carousel`,
    params: data
})

// 首页推荐
export const getRecommendList = (data: any) => http.get({
    url: `/client/home/recommend`,
    params: data
})

// 商品分类
export const getGoodsCategory = (data?: any) => http.get({
    url: `/client/goods/category`,
    params: data
})

// 商品分类（树形）
export const getGoodsCategoryTree = (data?: any) => http.get({
    url: `/client/goods/category/tree`,
    params: data
})

// 商品详情
export const getGoodsDetail = (id: PathIdType) => http.get({
    url: `/client/goods/detail/${id}`,
})

// 加入购物车
export const addCart = (data: CartItemAddType) => http.post({
    url: `/client/cart`,
    data
})

// 更新购物车
export const updateCart = (data: CartItemUpdateType) => http.put({
    url: `/client/cart`,
    data
})

// 删除购物车
export const deleteCart = (data: CartItemDeleteType) => http.delete({
    url: `/client/cart`,
    data
})

// 购物车列表
export const getCartList = () => http.get({
    url: `/client/cart`,
})
