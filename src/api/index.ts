import http from '@/utils/request'

// 注册
export const register = (data: any) => {
  return http.post(`/client/register`, data)
}

// 登录
export const login = (data: any) => {
  return http.post(`/client/login`, data)
}

// 首页轮播
export const getHomeCarousel = (data?: any) => {
  return http.get(`/client/home/carousel`, data)
}

// 首页推荐
export const getRecommendList = (data: any) => {
  return http.get(`/client/home/recommend`, data, { noLoading: true })
}
