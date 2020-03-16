import { requestUrl } from "../../api/requestUrl";
import { loadTableData } from "../../api/user";

export function loadData() {
    console.log(111)
    const tableData = {
        item: []
    }

    const tableLoadData = (params) =>{
        // 拿到父组件的 请求接口URL
      let requestJson = params

      // 根据后台API传参
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data
      };
      loadTableData(requestData)
        .then(response => {
            console.log(response)
          let responseData = response.data.data.data;
          if (responseData && responseData.length > 0) {
            // 赋值渲染页面 （前提是 父组件传的field字段需匹配 ）
            this.tableData = responseData;
          }
        })
        .catch(error => {});
    }
    return{
        tableData, tableLoadData
    }
}