import http from '@/utils/request'

// 注册
export const register = (data: any) => {
  return http.post('/h5/register', data)
}

// 登录
export const login = (data: any) => {
  return http.post('/h5/login', data)
}

// 首页轮播
export const getHomeBanner = (data?: any) => {
  return http.get('/h5/getHomeBanner', data)
}

// 首页推荐
export const getRecommendList = (data: any) => {
  return http.get('/h5/recommendList', data, { noLoading: true })
}
