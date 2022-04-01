import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/config/constants'
import { DictItem } from '@/types'

type Value = string | null

/**
 * 设置cookie
 * @param key 
 * @param value 
 */
export const setCookie = (key: string, value: Value): void => {
  Cookies.set(key, value)
}

/**
 * 读取cookie
 * @param key 
 * @returns 
 */
export const getCookie = (key: string): Value => {
  return Cookies.get(key)
}

/**
 * 设置token
 * @param value 
 */
export const setToken = (value: Value): void => {
  setCookie(TOKEN_KEY, value)
}

/**
 * 读取token
 */
export const getToken = (): Value => {
  return getCookie(TOKEN_KEY)
}

/**
 * 从字典列表取字典name
 * @param list 
 * @param value 
 * @returns 
 */
export const getDictName = (list: DictItem[], value: number | string | undefined): string => {
    const item = list.find(it => it.value === value)
    return item?.name || '' 
}

/**
 * 空值判断
 * @param value 
 * @returns 
 */
export const isEmpty = (value: any):boolean => value === '' || value === null || value === undefined || value === 'null'