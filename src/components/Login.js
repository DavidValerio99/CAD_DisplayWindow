import React, { useState } from "react";
import Cookies from "universal-cookie";

import * as firebase from "firebase/app";
import { auth } from "./firebase";
import { Helmet } from "react-helmet";
import Alert from "./Alert";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    type: "",
    message: ""
  });

  const handleChange = (target, name) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: target
    }));
  };

  const login = () => {
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(async (response) => {
        const cookies = new Cookies();
        await cookies.set("active_session", "true", {
          path: "/"
        });
        await cookies.set("user", response, {
          path: "/"
        });
        props.setUser(response);
      })
      .catch((err) => {
        let errorCode = err.code;
        let errorMessage = err.message;
        if (errorCode === "auth/wrong-password") {
          errorMessage = "Invalid password";
        }
        setError({
          type: "alert-danger",
          message: errorMessage
        });
      });
  };

  return (
    <section className="container-fluid">
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-4">
          <div className="content">
            <Helmet>
              <title>Login</title>
            </Helmet>
            <Alert error={error} />
            <div className="form-group">
              <label>User</label>
              <input
                value={user.email}
                type="email"
                onChange={(e) => {
                  handleChange(e.target.value, "email");
                }}
                className="form-control"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={user.password}
                type="password"
                onChange={(e) => {
                  handleChange(e.target.value, "password");
                }}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                login();
              }}
            >
              Log In
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Login;
