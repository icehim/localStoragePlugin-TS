// expire 过期时间key   permanent永久不过期
import {Data, Expire, Key, Result, StorageCls} from "./type";
import {Dictionaries} from "./enum";

// implements 实现类中的方法
export class Storage implements StorageCls {
    // <T> 泛型,T可以是任意类型
    set<T>(key: Key, value: T, expire: Expire = Dictionaries.permanent): void {
        const data = {
            value,//用户的value
            [Dictionaries.expire]: expire   //过期时间
        }
        localStorage.setItem(key, JSON.stringify(data))
    }

    get<T>(key: Key): Result<T | null> {
        const value = localStorage.getItem(key)
        if (value) {
            const data: Data<T> = JSON.parse(value)
            const now = new Date().getTime()
            // 判断有没有过期
            if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
                this.remove(key)
                return {
                    message: `您的${key}已过期`,
                    value: null
                }
            } else {
                return {
                    message: '成功',
                    value: data.value
                }
            }
        } else {
            return {
                message: '值无效',
                value: null
            }
        }
    }

    remove(key: Key) {
        localStorage.removeItem(key)
    }

    clear() {
        localStorage.clear()
    }
}
