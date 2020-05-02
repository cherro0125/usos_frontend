import Vue from 'vue';
import Router from 'vue-router';
import Grades from './components/Student/Grades/Grades';
import Login from './components/Login/Login';
import Scholarships from './components/Student/Scholarships/Scholarships';
import Payments from "./components/Student/Payments/Payments";
import Applications from "./components/Student/Applications/Applications";
import News from "./components/News/News";
import ApplicationFrom from './components/Student/Applications/ApplicationForm/ApplicationForm';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login,
            meta: { isPublic: true, onlyForLoggedOut: true }
        },
        {
            path: '/news',
            component: News,
            meta: {}
        },
        {
            path: '/student/grades',
            component: Grades,
            meta: { role: 'student' }
        },
        {
            path: '/student/scholarships',
            component: Scholarships,
            meta: { role: 'student' }
        },
        {
            path: '/student/payments',
            component: Payments,
            meta: { role: 'student' }
        },
        {
            path: '/student/applications',
            component: Applications,
            meta: { role: 'student' }
        },
        {
            path: '/student/applications/:id/apply',
            component: ApplicationFrom,
            meta: { role: 'student' }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(route => route.meta.isPublic);
    const onlyForLoggedOut = to.matched.some(route => route.meta.onlyForLoggedOut);
    const isLoggedIn = localStorage.getItem('role');

    if (isLoggedIn) {
        if (onlyForLoggedOut)
                next('/news');
        else
            next();
    }
    else if(!isPublic)
        next('/login');
    else
        next();
});

export default router;