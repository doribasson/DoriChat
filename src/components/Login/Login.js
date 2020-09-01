import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    //firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()); login
    auth
      .signInWithPopup(provider) //login.. same like the above
      //   .then(result => console.log(result))
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/75/Whatsapp_logo_svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to doriChat</h1>
        </div>
        <Button type="submut" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;