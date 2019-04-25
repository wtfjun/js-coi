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
