import Vue from 'vue';
import router from '@/router/index/index';
import permissionData from '@/config/permission';
import app from './app';
// 加载公共配置，包括element,设置__webpack_public_path__等
import '@/assets/js/common';
import {
    Slide,
    Http,
    Permission,
    DateRange,
    Search,
    SearchItem,
    Toolbar,
    DeleteButton
} from 'ct-dart';
Vue.use(DateRange);
Vue.use(Slide);
Vue.use(Http);
Vue.use(Permission);
Vue.use(Search);
Vue.use(SearchItem);
Vue.use(Toolbar);
Vue.use(DeleteButton);
Http.setDefaults({
    interceptError: function (err) {
        Vue.prototype.$message({
            message: '网络错误，请重试',
            type: 'error'
        });
        return true;
    }
});

Permission.setDefaults({
    alias: permissionData,
    router: router
});

//设置BUS
const Bus = new Vue();

Vue.prototype.$bus = Bus;

const render = function () {
    new Vue({
        el: '#app',
        router,
        render: h => h(app)
    });
};

Vue.$dart.http.axios.get('http://yapi.tcy365.org:3000/mock/350/api/permission')
    .then(function (response) {
        if (response.data.Code === 0) {
            Vue.$dart.permission.success(response.data.Data);
        } else {
            Vue.$dart.permission.fail();
        }
    })
    .catch(function (error) {
        Vue.$dart.permission.error();
    })
    .finally(() => {
        render();
    });
