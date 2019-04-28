## js-coi：一个灵活的前端校验工具

安装
```
yarn add js-coi 
// npm install js-coi
```

使用：
```
const Coi = require('js-coi')
// import Coi from 'js-coi'

const validCoi = new Coi()
validCoi
    .data('1234')
    // 设置label 则label会添加到错误信息前
    .label('id')
    .isRequired('不能为空')
    .minLength(3, '不能少于3位')
    .maxLength(5, '不能多于5位')

    // .data('1234')
    // 不设置label 则错误信息完全定制 需要输入完整错误信息
    // .isRequired('id不能为空')

    .data('1234@qq.')
    .label('邮箱')
    .isRequired('不能为空')
    .isEmail('格式不正确')

    .data('http:dwd')
    .label('url')
    .isRequired('不能为空')
    .isURL('格式不正确')

if (!validCoi.pass) {
    // 打印错误信息
    console.log(validCoi.errorMessage)
    
    // 调用弹窗组件提示错误信息
    // this.$message.error(validCoi.errorMessage)
    return
}
```

当然你只校验一个字段的话也可以这么使用：
```
const idCoi = new Coi('1234', 'id')
idCoi
    .isRequired('不能为空')
    .minLength(3, '不能少于3位')
    .maxLength(5, '不能多于5位')
    .isEmail('邮箱格式不正确')
    .isURL('格式不正确')
    .requireFormat(['number', 'letter', 'chinese'], '格式不正确')
    .requireRegexp(/012345/, '格式不正确')
```

<i>将会持续补充校验规则，欢迎关注，提issue。</i>
<br />
<br />
<i>如有疑问，欢迎联系。wx：c13266836563（陈小俊）<i/>
