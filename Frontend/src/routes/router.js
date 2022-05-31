import Home from '../pages/home/home.component';
import Login from '../pages/login/Login.component';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/', component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
