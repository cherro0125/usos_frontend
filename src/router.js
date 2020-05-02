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
            component: News,
            meta: { isPublic: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { isPublic: true, onlyForLoggedOut: true }
        },
        {
            path: '/grades',
            component: Grades,
            meta: {}
        },
        {
            path: '/scholarships',
            component: Scholarships,
            meta: {}
        },
        {
            path: '/payments',
            component: Payments,
            meta: {}
        },
        {
            path: '/applications',
            component: Applications,
            meta: {}
        },
        {
            path: '/applications/:id/apply',
            component: ApplicationFrom,
            meta: {}
        },
    ]
});

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(route => route.meta.isPublic);
    const onlyForLoggedOut = to.matched.some(route => route.meta.onlyForLoggedOut);
    //const isLoggedIn = true;
    console.log(isPublic, onlyForLoggedOut)
    if(!isPublic)
        return next('/login');
    
    if(onlyForLoggedOut && localStorage.getItem('role')) 
        return next('/news')  

    next();
});

export default router;