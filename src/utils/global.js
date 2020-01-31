// confirm提示框  自定义的全局方法
export default {
    install(Vue, options) {
        Vue.prototype.confirm = function (params) {
            this.$confirm(params.content, params.tip || "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type:  params.type || "warning",
                    center: true
                })
                .then(() => {
                    if(params.fn){params.fn(params.id)}
                    
                })
                .catch(() => {
                    
                });
        }

        // Vue.prototype.xxxxxxx = function (){

        // }...
    }
}