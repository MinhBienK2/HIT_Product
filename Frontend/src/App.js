import React, { useEffect ,useState} from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { publicRoutes } from "./routes/router";
import { connectWithWebSocket } from "./utils/webSocket";
import AuthGuard from './middlewares/AuthGuard'
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import Choice from "./pages/resetPass/choice/Choice";
import Axios from './services/axios.service'

function App() {
   const [status,setStatus] = useState('')
   useEffect(() => {
      connectWithWebSocket();
   }, []);

   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path='/login' element={localStorage.getItem('isLogin') ? <Navigate to="/" /> : <Login />}/>
               <Route path='/Signup' element={localStorage.getItem('isLogin') ? <Navigate to="/" /> :<Signup />}/>
               <Route path='/ForgetPass' element={localStorage.getItem('isLogin') ? <Navigate to="/" /> :<ForgetPass />}/>
               <Route path='/Choice' element={localStorage.getItem('isLogin') ? <Navigate to="/" /> :<Choice />}/>
               <Route element={<AuthGuard isLogin={localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false}/>}>
                  {publicRoutes.map((route, index) => {
                     const Layout = route.component;
                     return (
                        <Route
                           key={index}
                           path={route.path}
                           element={<Layout />}
                        />
                     );
                  })}
               </Route>
            </Routes>
         </div>
      </Router>
   );
}

export default App;
