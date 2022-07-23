import Home from "../pages/home/home";
import Profile from "../pages/profile/Profile";
import NewPass from "../pages/resetPass/newPass/NewPass";
import CheckEmail from "../pages/resetPass/checkEmail/CheckEmail";
import Chatbox from "../pages/chatbox/Chatbox";
import ListFriend from "../pages/chatbox/ListFriend";
import Video from "../pages/video/Video";
import Messenger from "../pages/messenger/Messenger";
import NotificationCallVideo from "../components/notificationCallVideo/NotificationCallVideo";
import Watch from "../pages/watch/Watch";

const publicRoutes = [
  { path: "/", component: Profile },
  // { path: "/", component: Home },
  // { path: "/NewPass", component: NewPass },
  // { path: "/CheckEmail", component: CheckEmail },
  // { path: "/messages", component: Chatbox },
  // // { path: "/messages/:friendId", component: chat },
  // { path: "/friends", component: ListFriend },
  // { path: "/videos", component: Video
  // { path: "/Messenger", component: Messenger },
  // { path: "/Watch", component: Watch },
  // { path: "/notification-call-video", component: NotificationCallVideo },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
