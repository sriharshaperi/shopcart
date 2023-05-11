import React, { useContext, useEffect, useState } from "react";
import { COMPONENTS, ACTIONS } from "../utils/constants";
import "./Navbar.css";
import { sumUpQuantities } from "../utils/utils";
import { StateContext } from "./App";
import { fetchLogout } from "../apicalls/auth-apicalls";

function Navbar() {
  const [state, dispatch] = useContext(StateContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    toggleComponentAndSearchInput();
  }, [searchInput]);

  function toggleComponentAndSearchInput() {
    dispatch({ type: ACTIONS.SET_SEARCH_INPUT, searchInput });
    dispatch({
      type: ACTIONS.SET_COMPONENT,
      activeComponent:
        (searchInput && COMPONENTS.PRODUCTS) || COMPONENTS.CATEGORIES,
    });
  }

  function handleChange(event) {
    const input = event.currentTarget.value;
    setSearchInput(input);
  }

  function handleClick(event, component) {
    event.preventDefault();
    dispatch({ type: ACTIONS.SET_COMPONENT, activeComponent: component });
  }

  function handleLogout() {
    fetchLogout()
      .then(() => {
        dispatch({ type: ACTIONS.PENDING });
        setTimeout(() => {
          dispatch({ type: ACTIONS.LOG_OUT });
        }, 2000);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  return (
    <div className="component__navbar">
      <div className="navbar__left">
        <div
          className="navbar__title"
          onClick={(event) => handleClick(event, COMPONENTS.CATEGORIES)}
        >
          <img
            className="nav__logo"
            src="./icons/appicon.png"
            alt="nav__logo"
          />
        </div>
        <div className="navbar__links">
          <a
            href="#/categories"
            className="categories__link"
            onClick={(event) => handleClick(event, COMPONENTS.CATEGORIES)}
          >
            Categories
          </a>
          <a
            href="#/"
            className="cart__link"
            onClick={(event) => handleClick(event, COMPONENTS.CART)}
          >
            Cart
          </a>
          <a
            href="#/"
            className="wishlist__link"
            onClick={(event) => handleClick(event, COMPONENTS.WISHLIST)}
          >
            Wishlist
          </a>
        </div>
        <div className="nav__search">
          <input
            className="navbar__searchbar"
            type="search"
            name="navbarsearch"
            onChange={handleChange}
            value={searchInput}
            placeholder="Search here"
          />
        </div>
      </div>
      <div className="logout__button__section">
        <div
          className="gg-shopping-cart"
          onClick={(event) => handleClick(event, COMPONENTS.CART)}
        >
          <span className="navbar__cart">({sumUpQuantities(state.cart)})</span>
        </div>
        <button className="button__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
