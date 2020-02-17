// VueX 获取一级分类接口 actions异步操作
import {GetCategory} from '../../api/news'  

const actions = {
    getCategory(content, requestData) {
        return new Promise((resolve, reject) => {
            // 调用GetCategory接口
            GetCategory({}).then((response) => {
                resolve(response.data.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}



export default {
    namespaced: true,
    actions
}