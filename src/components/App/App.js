import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import Login from "../../components/Login/Login";
import { useStateValue } from "../../StateProvider";
function App() {
  // const [user, setUser] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  const [{ user }, dispatch] = useStateValue();
  const mobile = window.innerWidth <= 500;

  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function updateSize() {
    setWidth(window.innerWidth);
    // console.log(window.innerWidth);
  }
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          {mobile ? (
            <Router>
              <Switch>
                <Route path="/rooms/:roomId" component={Chat}></Route>
                <Route path="/" component={Sidebar}></Route>
              </Switch>
            </Router>
          ) : (
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId" component={Chat}></Route>
              </Switch>
            </Router>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
