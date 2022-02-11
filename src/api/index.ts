import http from '@/utils/request'

// 注册
export const register = (data: any) => {
  return http.post('/client/register', data)
}

// 登录
export const login = (data: any) => {
  return http.post('/client/login', data)
}

// 首页轮播
export const getHomeBanner = (data?: any) => {
  return http.get('/client/getHomeBanner', data)
}

// 首页推荐
export const getRecommendList = (data: any) => {
  return http.get('/client/recommendList', data, { noLoading: true })
}
