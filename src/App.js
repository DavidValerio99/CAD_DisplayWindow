import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cookies from "universal-cookie";
import ImageDisplay from "./components/ImageDisplay";
import Login from "./components/Login";
import { config } from "./components/firebase";

//Styling libraries
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("user") && cookies.get("active_session")) {
      setUser(cookies.get("user"));
    }
  }, []);

  const loginProps = {
    config: config,
    setUser: setUser
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          {user ? (
            <Route path="/" render={() => <ImageDisplay />} />
          ) : (
            <Route path="/" render={() => <Login {...loginProps} />} />
          )}
        </Switch>
      </Router>
    </div>
  );
}
