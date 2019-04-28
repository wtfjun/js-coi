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
    .isRequired('id不能为空')
    .minLength(3, 'id不能少于3位')
    .maxLength(5, 'id不能多于5位')

    .data('1234@qq.')
    .isRequired('邮箱不能为空')
    .isEmail('邮箱格式不正确')

    .data('http:dwd')
    .isRequired('url不能为空')
    .isURL('url格式不正确')

if (!validCoi.pass) {
    this.$message.error(validCoi.errorMessage)
    return
}
```

当然你只校验一个字段的话也可以这么使用：
```
const idCoi = new Coi('1234')
idCoi
    .isRequired('id不能为空')
    .minLength(3, 'id不能少于3位')
    .maxLength(5, 'id不能多于5位')
    .isEmail('id邮箱格式不正确')
    .isURL('id格式不正确')
    .requireFormat(['number', 'letter', 'chinese'], 'id格式不正确')
    .requireRegexp(/012345/, 'id格式不正确')

if (!idCoi.pass) {
    this.$message.error(idCoi.errorMessage)
    return
}
```
