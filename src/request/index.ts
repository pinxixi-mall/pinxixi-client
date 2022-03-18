import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'
import { getToken, setToken } from '@/utils'
import { NOT_LOGIN, TOKEN_EXPIRED, TIMEOUT, BASE_URL } from '@/config/constants'
import { Toast, Dialog } from 'vant'
import router from '@/router'

class Request {
    // axios 实例
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors

        // 全局请求拦截器
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                console.log('全局请求拦截器')
                const token = getToken()
                if (token) {
                    config.headers && (config.headers.Authorization = `Bearer ${token}`)
                }
                return config
            },
            (err: any) => err,
        )

        // 实例拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch,
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch,
        )

        // 全局响应拦截器
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                const { data } = res
                if (data && data.code !== 200) {
                    if (data.code === NOT_LOGIN) {
                        setToken('')
                    } else if (data.code === TOKEN_EXPIRED) {
                        setToken('')
                        Dialog.alert({
                          title: '提示',
                          message: '登录状态已失效，请重新登录'
                        }).then(() => {
                          router.replace('/login')
                        })
                    } else if (data.code === 400) {
                        Toast('请求数据校验不通过')
                    } else {
                        Toast(data.msg || '请求异常')
                    }
                    // 只要不等于 200 都是返回error
                    return Promise.reject(data)
                }
                return data
            },
            (err: any) => {
                let error = {
                    code: -1,
                    msg: '请求异常',
                    data: {}
                }

                if (err.code === 'ECONNABORTED') {
                    error.msg = '网络繁忙，请稍后再试'
                }
                if (err.response && err.response.status && err.response.status === 404) {
                    error.msg = '路径地址不正确'
                }
                if (err.response && err.response.status && err.response.status === 400) {
                    let strMsg = []
                    let errData = err.response.data && err.response.data.data
                    if (errData && errData) {
                        for (let errKey in errData) {
                            strMsg.push(errData[errKey])
                        }
                    }
                    error.msg = strMsg.join('；') || '请求参数不合法'
                }

                // Toast(error.msg)
                return Promise.reject(error)
            }
        )
    }

    request<T>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config)
            }
            this.instance
                .request<any, T>(config)
                .then(res => {
                    // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
                    // if (config.interceptors?.responseInterceptors) {
                    //     res = config.interceptors.responseInterceptors<T>(res)
                    // }
                    resolve(res)
                })
                .catch((err: any) => {
                    reject(err)
                })
        })
    }

    get<T = any>(config: RequestConfig): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'GET'
        })
    }
    
    post<T = any>(config: RequestConfig): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'POST'
        })
    }

    put<T = any>(config: RequestConfig): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'PUT'
        })
    }

    delete<T = any>(config: RequestConfig): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'DELETE'
        })
    }
}

const http = new Request({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
})

export default http