/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';
import Grades from './components/Student/Grades/Grades';
import Login from './components/Login/Login';
import Scholarships from './components/Student/Scholarships/Scholarships';
import Payments from "./components/Student/Payments/Payments";
import Applications from "./components/Student/Applications/Applications";
import News from "./components/News/News";
import ApplicationFrom from './components/Student/Applications/ApplicationForm/ApplicationForm';
import AccountCreation from './components/Rector/UserAccounts/AccountCreation/AccountCreation';
import GradesTable from './components/Lecturer/Grades/GradesTable/GradesTable';
import LecturerGradesPanel from './components/Lecturer/Grades/LecturerGradesPanel';

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
        {
            path: '/rector/accounts/create',
            component: AccountCreation,
            meta: { role: 'rector' }
        },
        {
            path: '/lecturer/grades',
            component: LecturerGradesPanel,
            meta: { role: 'lecturer' }
        },
        {
            path: '/lecturer/grades/:subject/:group',
            component: GradesTable,
            meta: { role: 'lecturer' }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(route => route.meta.isPublic);
    const onlyForLoggedOut = to.matched.some(route => route.meta.onlyForLoggedOut);
    const isLoggedIn = store.getters.isLoggedIn;
    const role = localStorage.getItem('role');
    const roleResticted = to.matched.some(route => route.meta.role); 
    const rectorAccess = to.matched.some(route => route.meta.role === 'rector');
    const studentAccess = to.matched.some(route => route.meta.role === 'student');
    const deanAcess = to.matched.some(route => route.meta.role === 'dean');
    const lecturerAcess = to.matched.some(route => route.meta.role === 'lecturer');

    if (isLoggedIn) {
        if (onlyForLoggedOut)
            next('/news');
        else if (roleResticted) {
            if (rectorAccess && role.toLowerCase() === 'rector')
                next();
            else if (studentAccess && role.toLowerCase() === 'student')
                next();
            else if (deanAcess && role.toLowerCase() === 'dean')
                next();
            else if (lecturerAcess && role.toLowerCase() === 'lecturer')
                next();
            else 
                next('news');
        }
        else
            next();
    }
    else if (!isPublic)
        next('/login');
    else
        next();
});

export default router;