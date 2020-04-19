import Vue from 'vue';
import Router from 'vue-router';
import Grades from './components/Grades/Grades';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/grades',
            component: Grades
        },
    ]
});

export default router;