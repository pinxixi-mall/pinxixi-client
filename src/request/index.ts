import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'
import { getToken, setToken } from '@/utils'
import { TIMEOUT, BASE_URL, TOKEN_HEADER } from '@/config/constants'
import { Toast, Dialog } from 'vant'
import router from '@/router'
import { HttpStatusEnum } from '@/config/httpStatusEnum'

class Request {
    // axios实例
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors
    // loading标识
    noLoading?: boolean

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors

        // 全局请求拦截器
        this.instance.interceptors.request.use(
            (config: RequestConfig) => {
                this.shwoLoading(config)
                const token = getToken()
                if (token) {
                    config.headers && (config.headers[TOKEN_HEADER] = `Bearer ${token}`)
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
                this.clearLoading()
                const { data } = res
                if (data && data.code !== HttpStatusEnum.SUCCESS) {
                    if (data.code === HttpStatusEnum.UNAUTHORIZED) {
                      setToken('')
                      Dialog.alert({
                        title: '请登录后再操作',
                      }).then(() => {
                        router.replace('/login')
                      })
                    } else if (data.code === HttpStatusEnum.FORBIDDEN) {
                        setToken('')
                        Dialog.alert({
                          title: '登录已失效，请重新登录',
                        }).then(() => {
                          router.replace('/login')
                        })
                    } else if (data.code === HttpStatusEnum.BAD_REQUEST) {
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
                this.clearLoading()
                const { response } = err
                let error = {
                    code: -1,
                    msg: '请求异常',
                    data: {}
                }

                if (err.code === 'ECONNABORTED') {
                    error.msg = '网络繁忙，请稍后再试'
                }
                if (response && response.status && response.status === 404) {
                    error.msg = '路径地址不正确'
                }
                if (response && response.status && response.status === 400) {
                    let strMsg = []
                    let errData = response.data && response.data.data
                    if (errData && errData) {
                        for (let errKey in errData) {
                            strMsg.push(errData[errKey])
                        }
                    }
                    error.msg = strMsg.join('；') || '请求参数不合法'
                }

                Toast(error.msg)
                return Promise.reject(error)
            }
        )
    }

    shwoLoading(config: RequestConfig) {
        this.noLoading = config.options?.noLoading
        !this.noLoading && Toast.loading({ forbidClick: true })
    }

    clearLoading() {
        !this.noLoading && Toast.clear()
    }
  
    request<T>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            // 单个请求的拦截器
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config)
            }
            this.instance
                .request<any, T>(config)
                .then(res => {
                    // 单个请求拦截
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