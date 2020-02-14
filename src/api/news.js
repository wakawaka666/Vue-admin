import service from "../utils/request.js"
/* 
获取列表
 */
export function GetList(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

/* 
新增信息
*/
export function AddInfo(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

/* 
编辑
 */
export function EditInfo(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
}

/* 
删除
 */
export function DeleteInfo(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}

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
 添加子级分类
 */
export function AddChildrenCategory(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
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
 获取全部分类（包含子级）
 */
export function GetCategoryAll(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
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

 /*
 修改一级分类
 */
export function EditCategory(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}