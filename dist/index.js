// 字典 Dictionaries  expire过期时间key   permanent永久不过期
// 枚举类型
var Dictionaries;
(function (Dictionaries) {
    Dictionaries["permanent"] = "permanent";
    Dictionaries["expire"] = "__expire__";
})(Dictionaries || (Dictionaries = {}));

// implements 实现类中的方法
class Storage {
    // <T> 泛型,T可以是任意类型
    set(key, value, expire = Dictionaries.permanent) {
        const data = {
            value,
            [Dictionaries.expire]: expire //过期时间
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            const data = JSON.parse(value);
            const now = new Date().getTime();
            // 判断有没有过期
            if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
                this.remove(key);
                return {
                    message: `您的${key}已过期`,
                    value: null
                };
            }
            else {
                return {
                    message: '成功',
                    value: data.value
                };
            }
        }
        else {
            return {
                message: '值无效',
                value: null
            };
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}

export { Storage };
