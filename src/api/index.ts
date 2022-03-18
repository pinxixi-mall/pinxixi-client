import http from '@/request'

// 登录
export const login = (data: any) => http.post({
    url: '/client/login',
    data
})

// 注册
export const register = (data: any) => http.post({
    url: '/client/register',
    data
})

// 首页轮播
export const getHomeCarousel = (data?: any) => http.get({
    url: '/client/home/carousel',
    params: data
})

// 首页推荐
export const getRecommendList = (data: any) => http.get({
    url: '/client/home/recommend',
    params: data
})