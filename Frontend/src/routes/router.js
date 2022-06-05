import Home from "../pages/home/home";
import Login from "../pages/login/Login";
import ForgetPass from "../pages/forgetPass/ForgetPass";
import Signup from "../pages/signup/Signup";
import Choice from "../pages/resetPass/choice/Choice";
import NewPass from "../pages/resetPass/newPass/NewPass";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/ForgetPass", component: ForgetPass },
  { path: "/Home", component: Home },
  { path: "/Signup", component: Signup },
  { path: "/Choice", component: Choice },
  { path: "/NewPass", component: NewPass },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
