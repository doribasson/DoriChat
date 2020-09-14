import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import Login from "../../components/Login/Login";
import { useStateValue } from "../../StateProvider";
function App() {
  // const [user, setUser] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  // console.log(user);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        // (window.innerWidth > 768) ?  className="web" : className="phone"
        // document.querySelector(".sidebar").style.display = "flex";

        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId" component={Chat}></Route>
              {width < 768 ? (
                <Route path="/" component={Sidebar}></Route>
              ) : (
                <Route path="/"></Route>
              )}
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
