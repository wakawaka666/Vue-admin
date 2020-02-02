// confirm提示框  自定义的全局方法
export default {
    install(Vue, options) {
        const str = ""
        Vue.prototype.confirm = function (params) {
            this.$confirm(params.content, params.tip || "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: params.type || "warning",
                    center: true
                })
                .then(() => {
                    // 确定
                    this.str = params.id || '';
                    params.fn && params.fn(params.id || '')

                })
                .catch(() => {
                    // 取消
                    params.catchFn && params.catchFn()

                });
        }

        // Vue.prototype.xxxxxxx = function (){

        // }...
    }
}