## Coi：一百行js代码实现一个校验工具

源码：[git仓库](https://github.com/wtfjun/js-coi) 欢迎star & fork ～～

做过校验需求的小伙伴们都知道，校验其实是个麻烦事。

规则多，需要校验的字段多，都给我们前端带来巨大的工作量。

一个不小心，代码里就出现了不少``if else``等不可维护的代码。

因此，我觉得一个团队或者是一个项目，需要一个校验工具，简化我们的工作。

首先，参考一下 Joi。只看这一小段代码：

``Joi.string().alphanum().min(3).max(30).required()``

我希望我的校验工具Coi也是链式调用，链式调用可以极大的简化代码。

校验呢，其实主要就3个入参：需要校验的数据，提示的错误信息，校验规则。

哎 直接把代码贴出来吧，反正就一百行，一目了然：

```
export default class Coi {
    constructor(prop) {
        this.input = prop
        this.errorMessage = '通过校验' // 错误信息
        this.pass = true // 校验是否通过
    }

    // 数据输入
    data(input) {
        if (!this.pass) return this

        this.input = input
        return this
    }

    // 必填，不能为空
    isRequired(message) {
        if (!this.pass) return this

        if (
            /^\s*$/g.test(this.input) ||
            this.input === null ||
            this.input === undefined
        ) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    // 最小长度
    minLength(length, message) {
        if (!this.pass) return this

        if (this.input.length < length) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    // 最大长度
    maxLength(length, message) {
        if (!this.pass) return this

        if (this.input.length > length) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    // 需要的格式 number: 数字, letter: 字母, chinese: 中文
    requireFormat(formatArray, message) {
        if (!this.pass) return this
        let formatMap = {
            number: 0,
            letter: 0,
            chinese: 0
        }

        Object.keys(formatMap).forEach(key => {
            if (formatArray.includes(key)) formatMap[key] = 1
        })

        let formatReg = new RegExp(
            `^[${formatMap.number ? '0-9' : ''}${
                formatMap.letter ? 'a-zA-Z' : ''
            }${formatMap.chinese ? '\u4e00-\u9fa5' : ''}]*$`
        )

        if (!formatReg.test(this.input)) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    // 邮箱校验
    isEmail(message) {
        if (!this.pass) return this

        const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (!emailReg.test(this.input)) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    // ulr校验
    isURL(message) {
        if (!this.pass) return this

        const urlReg = new RegExp(
            '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
            'i'
        )
        if (!urlReg.test(this.input)) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }

    // 自定义正则校验
    requireRegexp(reg, message) {
        if (!this.pass) return this

        if (!reg.test(this.input)) {
            this.errorMessage = message
            this.pass = false
        }
        return this
    }
}
```

使用姿势如下：
```
import Coi from 'js-coi'

const validCoi = new Coi()
validCoi
    .data('1234')
    .isRequired('id不能为空')
    .minLength(3, 'id不能少于3位')
    .maxLength(5, 'id不能多于5位')

    .data('1234@qq.)
    .isRequired('邮箱不能为空')
    .isEmail('邮箱格式不正确')

    .data('http:dwd')
    .isRequired('url不能为空')
    .isUrl('url格式不正确')

if (!validCoi.pass) {
    this.$message.error(validCoi.errorMessage)
    return
}
```

当然你只校验一个字段的话也可以这么使用：
```
import Coi from 'js-coi'

const idCoi = new Coi('1234')
idCoi
    .isRequired('id不能为空')
    .minLength(3, 'id不能少于3位')
    .maxLength(5, 'id不能多于5位')
    .isEmail('id邮箱格式不正确')
    .isUrl('id格式不正确')
    .requireFormat(['number', 'letter', 'chinese'], 'id格式不正确')
    .requireRegexp(/012345/, 'id格式不正确')

if (!idCoi.pass) {
    this.$message.error(idCoi.errorMessage)
    return
}
```
