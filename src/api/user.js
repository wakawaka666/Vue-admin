import service from "../utils/request.js"

/* 
请求表格数据
*/
export function loadTableData(params) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: params.method || "post",
        url: params.url,
        data: params.data || {}
    })
}