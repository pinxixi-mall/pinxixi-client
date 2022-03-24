
/**
 * http状态码
 */
export enum HttpStatusEnum {
    /**
     * 成功
     */
    SUCCESS = 200,

    /**
     * 没有数据
     */
    NO_CONTENT = 204,

    /**
     * 请求语法错误
     */
    BAD_REQUEST = 400,

    /**
     * 请求未授权
     */
    UNAUTHORIZED = 401,

    /**
     * 无效的签名
     */
    INVALID_AUTH = 401,

    /**
     * 授权已过期
     */
    FORBIDDEN = 403,

    /**
     * 资源未找到
     */
    NOT_FOUND = 404,

    /**
     * 服务器异常
     */
    ERROR = 500,

    /**
     * 请求失败
     */
    FAIL = -1,
    
}