import React, { useContext } from "react";
import "./Footer.css";
import { StateContext } from "./App";

function Footer() {
  const [state, dispatch] = useContext(StateContext);

  return (
    <div className="component__footer">
      <span style={{ display: "none" }}>{`${state}`}</span>
    </div>
  );
}

export default Footer;
