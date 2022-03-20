import http from '@/request'

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