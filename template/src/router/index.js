import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/pages/index/index.vue';
import edit from '@/pages/index/edit/index';
import view from '@/pages/index/view/index';
import add from '@/pages/index/add/index';
Vue.use(VueRouter);
const routes = [{
    path: '/',
    component: Index,
    children: [{
        path: 'edit',
        component: edit
    },
    {
        path: 'add',
        component: add
    },
    {
        path: 'view',
        component: view
    }
    ]
}

];

export default new VueRouter({
    routes
});
