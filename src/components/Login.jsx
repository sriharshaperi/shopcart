import React, { useContext, useState } from "react";
import { ACTIONS } from "../utils/constants";
import { StateContext } from "./App";
import { fetchLogin } from "../apicalls/auth-apicalls";
import "./Login.css";
import Status from "./Status";

function Login() {
  const [state, dispatch] = useContext(StateContext);
  const [username, setUsername] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    fetchLogin(username)
      .then(({ userData }) => {
        dispatch({ type: ACTIONS.PENDING });
        setTimeout(() => {
          dispatch({ type: ACTIONS.LOG_IN, username: userData.username });
          dispatch({ type: ACTIONS.REPLACE_CART, cart: userData.cart });
          dispatch({
            type: ACTIONS.REPLACE_WISHLIST,
            wishList: userData.wishList,
          });
        }, 2000);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function handleChange(event) {
    setUsername(event.target.value);
  }

  return (
    <div className="component__login">
      <form
        className="form__login"
        action="#/login"
        method="POST"
        onSubmit={handleLogin}
      >
        <img
          className="login__app__icon"
          src="./icons/appicon.png"
          alt="login__app__icon"
        />
        <span className="error__message">
          {state.error && <Status error={state.error} />}
        </span>
        <input
          className="input__username"
          type="text"
          name="username"
          onChange={handleChange}
          value={username}
          placeholder="Enter Username"
        />
        <button className="button__login" type="submit">
          Login
        </button>
      </form>
      <span style={{ display: "none" }}>{`${state}`}</span>
    </div>
  );
}

export default Login;
