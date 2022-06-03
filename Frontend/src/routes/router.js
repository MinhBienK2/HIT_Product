import Home from "../pages/home/home";
import Login from "../pages/login/Login";
import ForgetPass from "../pages/forgetPass/ForgetPass";
import Signup from "../pages/signup/Signup";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/Register", component: ForgetPass },
  { path: "/Home", component: Home },
  { path: "/Signup", component: Signup },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
