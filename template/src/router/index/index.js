import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/pages/index/index.vue';

Vue.use(VueRouter);
const routes = [{
    path: '/',
    component: Index,
    children: [{
        path: 'edit',
        name: 'edit',
        component: () => import('@/pages/index/edit/index.vue')
    },
    {
        path: 'add',
        component: () => import('@/pages/index/add/index.vue')
    },
    {
        path: 'view',
        name: 'view',
        component: () => import('@/pages/index/view/index.vue')
    }
    ]
}

];

export default new VueRouter({
    routes
});
