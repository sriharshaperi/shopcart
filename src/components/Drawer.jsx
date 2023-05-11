import React, { useReducer } from "react";
import { reducer } from "../state/reducer";
import { initialState } from "../state/state";
import { ACTIONS } from "../utils/constants";

function Drawer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const drawerContents = ["Dashboard", "Products", "Cart"];

  function handleClick(value) {
    dispatch({
      type: ACTIONS.SET_COMPONENT,
      activeComponent: value.toLowerCase(),
    });
  }

  return (
    <div className="component__drawer">
      <div className="drawer__control">
        <h3 className="drawer__title">App Name</h3>
        <button className="button__drawer__close">X</button>
      </div>
      <div className="drawer__content">
        <ul className="drawer__content__list">
          {drawerContents.map((data) => (
            <li
              key={`#${data.toLowerCase()}`}
              id={`#${data.toLowerCase()}`}
              className="drawer__item"
              onClick={() => handleClick(data)}
            >
              {data}
            </li>
          ))}
        </ul>
        <p className="drawer__basenote">copyrights</p>
      </div>
    </div>
  );
}

export default Drawer;
