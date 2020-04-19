import Vue from 'vue';
import Router from 'vue-router';
import Grades from './components/Grades/Grades';
import Login from './components/Login/Login';
import Scholarships from './components/Scholarships/Scholarships';
import Payments from "./components/Payments/Payments";

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
        {
            path: '/scholarships',
            component: Scholarships
        },
        {
            path: '/payments',
            component: Payments
        },
    ]
});

export default router;