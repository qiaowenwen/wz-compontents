# wz-tables

### 使用说明

### 配置参数

#### - wz-tables 属性配置 -

| 参数          | 类型    | 值          | 说明                |
| :------------ | :------ | :---------- | :------------------ |
| data          | Array   | 数据源      | 表格的数据源数据    |
| checked       | Boolean | 默认：false | 是否可以 check 勾选 |
| hasPagination | Boolean | 默认: false | 是否显示需要分页    |
| pageSize      | String  | 默认：5     | 每页显示的条数      |

#### - wz-table-column 属性配置 -

| 参数     | 类型    | 值                   | 说明           |
| :------- | :------ | :------------------- | :------------- |
| label    | String  | eg: '标题名 1'       | 表头标题名     |
| width    | String  | eg: '17% 或者 100px' | 列宽度         |
| prop     | String  | eg: 'name'           | 列数据的属性名 |
| sortable | Boolean | 默认: false          | 列是否排序     |
