import Vue from 'vue';
import Router from 'vue-router';
import Grades from './components/Grades/Grades';
import Login from './components/Login/Login';
import Scholarships from './components/Scholarships/Scholarships';
import Payments from "./components/Payments/Payments";
import Applications from "./components/Applications/Applications";
import News from "./components/News/News";
import ApplicationFrom from './components/Applications/ApplicationForm/ApplicationForm';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/news',
            component: News
        },
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
        {
            path: '/applications',
            component: Applications
        },
        {
            path: '/applications/:id/apply',
            component: ApplicationFrom
        },
    ]
});

router.replace('/news');

export default router;