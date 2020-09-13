import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import Login from "../../components/Login/Login";
import { useStateValue } from "../../StateProvider";
function App() {
  // const [user, setUser] = useState(null);

  const [{ user }, dispatch] = useStateValue();

  // console.log(user);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId" component={Chat}>
                {/* <Chat /> */}
              </Route>
              <Route path="/">{/* <Chat /> */}</Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
