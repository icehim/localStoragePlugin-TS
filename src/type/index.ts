// expire 过期时间key   permanent永久不过期

// type设置类型别名
import {Dictionaries} from "../enum";

export type Key = string
export type Expire = Dictionaries.permanent | number    //时间戳 或者 永久 Dictionaries.permanent
export interface Result<T> {
    message: string
    value: T | null
}

export interface Data<T> {
    value: T,
    [Dictionaries.expire]: Expire
}

// 定义接口类中的方法
export interface StorageCls {
    get: <T>(key: Key) => void
    set: <T>(key: Key, value: T, expire: Expire) => void
    remove: (key: Key) => void
    clear: () => void
}
