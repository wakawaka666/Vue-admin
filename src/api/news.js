import service from "../utils/request.js"
/* 
列表
 */

/* 
新增
*/

/* 
编辑
 */

/* 
删除
 */

 /*
 添加一级分类
 */
export function AddFirstCategory(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

 /*
 获取一级分类
 */
export function GetCategory(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}

 /*
 删除一级分类
 */
export function DeleteCategory(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}