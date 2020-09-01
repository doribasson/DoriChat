import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import Login from "../../components/Login/Login";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
function App() {
  // const [user, setUser] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./App.css";
// import Sidebar from "./components/sidebar/Sidebar";
// import Chat from "./components/Chat/Chat";
// function App() {
//   return (
//     <div className="app">
//       <div className="app__body">
//         <Router>
//           <Sidebar />
//           <Switch>
//             <Route path="/app">
//               <Chat />
//             </Route>
//             <Route path="/">
//               <h1>Home Screen</h1>
//             </Route>
//           </Switch>
//         </Router>
//       </div>
//     </div>
//   );
// }

// export default App;
