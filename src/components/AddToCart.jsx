import React, { useContext } from "react";
import { ACTIONS } from "../utils/constants";
import { StateContext } from "./App";
import { fetchAddToCart } from "../apicalls/cart-apicalls";
import "./AddToCart.css";

function AddToCart({ product }) {
  const [state, dispatch] = useContext(StateContext);

  function handleClick(event) {
    event.stopPropagation();
    fetchAddToCart(product)
      .then(({ cart }) => {
        dispatch({ type: ACTIONS.REPLACE_CART, cart: cart });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  return (
    <div className="component__add__to__cart">
      <button className="button__add__to__cart" onClick={handleClick}>
        Add To Cart
      </button>
    </div>
  );
}

export default AddToCart;
