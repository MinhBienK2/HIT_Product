import Home from "../pages/home/home";
import Login from "../pages/login/Login";
import ForgetPass from "../pages/forgetPass/ForgetPass";
import Signup from "../pages/signup/Signup";
import Choice from "../pages/resetPass/choice/Choice";
import Verify from "../pages/resetPass/verify/Verify";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/ForgetPass", component: ForgetPass },
  { path: "/Home", component: Home },
  { path: "/Signup", component: Signup },
  { path: "/Choice", component: Choice },
  { path: "/Verify", component: Verify },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
