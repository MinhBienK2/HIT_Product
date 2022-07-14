import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/router";
import { connectWithWebSocket } from "./utils/webSocket";

function App() {
   useEffect(() => {
      connectWithWebSocket();
   }, []);

   return (
      <Router>
         <div className="App">
            <Routes>
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
            </Routes>
         </div>
      </Router>
   );
}

export default App;
