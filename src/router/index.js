import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import utils from '../util/util.js';

Vue.use(VueRouter);
const routes = [
    {
        'path': '/',
        'redirect': '/login'
    },
    {
        'path': '/index',
        'name': 'index',
        'component': Home,
        'children': [
            {
                'path': '/',
                'redirect': 'detail'
            },
            {
                'path': 'detail',
                'name': 'detail',
                'component': () => import('../views/home.detail.vue')
            },
            {
                'path': 'property',
                'name': 'property',
                'component': () => import('../views/home.property.vue')
            }
        ]
    },
    {
        'path': '/login',
        'name': 'login',
        'component': () =>
            import(/* webpackChunkName: "about" */ '../views/login.vue')
    }
];

const router = new VueRouter({
    // mode: 'history',
    'base': process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    let userId = utils.sessionGetStore('userId');
    if (userId && userId !== '') {
        next();
    } else if (to.path.indexOf('login') !== -1) {
        next();
    } else {
        next({
            'path': '/login'
        });
    }
});
export default router;
