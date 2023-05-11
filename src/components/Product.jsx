import React, { useContext } from "react";
import "./Product.css";
import { StateContext } from "./App";
import { fetchAddToCart } from "../apicalls/cart-apicalls";
import { ACTIONS } from "../utils/constants";
import { fetchAddToWishList } from "../apicalls/wishlist-apicalls";

function Product() {
  const [state, dispatch] = useContext(StateContext);

  function handleAddToCart() {
    fetchAddToCart(state.activeProductData)
      .then(({ cart }) => {
        dispatch({ type: ACTIONS.REPLACE_CART, cart: cart });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function handleAddToWishList() {
    fetchAddToWishList(state.activeProductData)
      .then(({ wishList }) => {
        dispatch({ type: ACTIONS.REPLACE_WISHLIST, wishList });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  return (
    <div className="component__product">
      <div className="product">
        <div className="product__image__section">
          <img
            className="product__image"
            src={state.activeProductData.image}
            alt="product__image"
          />
        </div>
        <div className="product__details__section">
          <div className="product__details">
            <h2 className="product__name">{state.activeProductData.name}</h2>
            <p className="product__desc">{state.activeProductData.desc}</p>
            <h3 className="product__price">${state.activeProductData.price}</h3>
            <button className="add__to__cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
            <button className="add__to__wishlist" onClick={handleAddToWishList}>
              Add To WishList
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
