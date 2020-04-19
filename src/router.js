import Vue from 'vue';
import Router from 'vue-router';
import Grades from './components/Grades/Grades';
import Login from './components/Login/Login';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/grades',
            component: Grades
        },
    ]
});

export default router;