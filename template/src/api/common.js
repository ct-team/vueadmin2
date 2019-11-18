import Vue from 'vue';
export function successTip(data) {
    if (data.res.Code === 0) {
        Vue.prototype.$message({
            message: data.successMsg,
            type: 'success'
        });
    } else {
        Vue.prototype.$message({
            message: data.isErrorSYS ? data.res.Message : data.errorMsg,
            type: 'error'
        });
    }
}
