import Home from "../pages/home/home";
import Login from "../pages/login/Login";
import ForgetPass from "../pages/forgetPass/ForgetPass";
import Signup from "../pages/signup/Signup";
import Choice from "../pages/resetPass/choice/Choice";
import NewPass from "../pages/resetPass/newPass/NewPass";
import CheckEmail from "../pages/resetPass/checkEmail/CheckEmail";
import Chatbox from "../pages/chatbox/Chatbox";
import ListFriend from "../pages/chatbox/ListFriend";
import Video from "../pages/video/Video";
import Messenger from "../pages/messenger/Messenger";

const publicRoutes = [
   { path: "/", component: Login },
   { path: "/Register", component: ForgetPass },
   { path: "/Home", component: Home },
   { path: "/Signup", component: Signup },
   { path: "/Choice", component: Choice },
   { path: "/NewPass", component: NewPass },
   { path: "/CheckEmail", component: CheckEmail },
   { path: "/messages", component: Chatbox },
   // { path: "/messages/:friendId", component: chat },
   { path: "/friends", component: ListFriend },
   { path: "/videos", component: Video },
  { path: "/Messenger", component: Messenger },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
