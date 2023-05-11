import React, { useContext } from "react";
import { ACTIONS } from "../utils/constants";
import { priceWithCommas } from "../utils/utils";
import { StateContext } from "./App";
import "./Cart.css";
import Checkout from "./Checkout";
import {
  fetchChangeQuantity,
  fetchClearCart,
  fetchRemoveFromCart,
} from "../apicalls/cart-apicalls";
import { fetchAddToWishList } from "../apicalls/wishlist-apicalls";

function Cart() {
  const [state, dispatch] = useContext(StateContext);

  function handleChange(event, item) {
    const checked = event.target.checked;
    let checkoutItems;
    if (checked) checkoutItems = [...state.checkoutItems, item];
    else
      checkoutItems = [
        ...state.checkoutItems.filter((product) => product.id !== item.id),
      ];
    dispatch({ type: ACTIONS.REPLACE_CHECKOUT_ITEMS, checkoutItems });
  }

  function handleChangeQuantity(event, cartItem) {
    const quantity = Number(event.target.value);
    fetchChangeQuantity(cartItem, quantity).then(({ cart }) => {
      dispatch({ type: ACTIONS.REPLACE_CART, cart });
      const updatedCheckoutItems = [...state.checkoutItems];
      const currentCheckoutItem = updatedCheckoutItems.find(
        (item) => item.id === cartItem.id
      );
      if (currentCheckoutItem) {
        currentCheckoutItem.quantity = quantity;
        dispatch({
          type: ACTIONS.REPLACE_CHECKOUT_ITEMS,
          checkoutItems: updatedCheckoutItems,
        });
      }
    });
  }

  function handleSelectAll() {
    if (state.checkoutItems.length === 0)
      dispatch({
        type: ACTIONS.REPLACE_CHECKOUT_ITEMS,
        checkoutItems: state.cart,
      });
    else dispatch({ type: ACTIONS.REPLACE_CHECKOUT_ITEMS, checkoutItems: [] });
  }

  function handleRemoveFromCart(cartItem, type) {
    fetchRemoveFromCart(cartItem, type).then(({ cart }) => {
      dispatch({
        type: ACTIONS.REPLACE_CART,
        cart,
      });
    });
    if (state.checkoutItems.includes(cartItem)) {
      dispatch({
        type: ACTIONS.REPLACE_CHECKOUT_ITEMS,
        checkoutItems: state.checkoutItems.filter(
          (product) => product.name !== cartItem.name
        ),
      });
    }
  }

  function handleRemoveAll() {
    fetchClearCart().then(({ cart }) =>
      dispatch({
        type: ACTIONS.REPLACE_CART,
        cart,
      })
    );
    dispatch({
      type: ACTIONS.REPLACE_CHECKOUT_ITEMS,
      checkoutItems: [],
    });
  }

  function handleAddToWishlist(product) {
    fetchAddToWishList(product)
      .then(({ wishList }) => {
        dispatch({ type: ACTIONS.REPLACE_WISHLIST, wishList });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
    fetchRemoveFromCart(product, ACTIONS.REMOVE_ITEM)
      .then(({ cart }) => {
        dispatch({
          type: ACTIONS.REPLACE_CART,
          cart,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
    if (state.checkoutItems.includes(product)) {
      dispatch({
        type: ACTIONS.REPLACE_CHECKOUT_ITEMS,
        checkoutItems: state.checkoutItems.filter(
          (item) => item.id !== product.id
        ),
      });
    }
  }

  return (
    <>
      {(state.cart.length > 0 && <Checkout />) || (
        <h1 className="empty__cart__message">Your Cart Is Empty</h1>
      )}
      <div className="component__cart">
        {(state.cart.length > 0 && (
          <h1 className="cart__page">Cart Items</h1>
        )) || <></>}
        <div className="cart__list__buttons">
          <button
            style={{ display: (state.cart.length === 0 && "none") || "block" }}
            className="checkout__select__all"
            onClick={handleSelectAll}
          >
            {(state.checkoutItems.length !== state.cart.length && "Select") ||
              "Deselect"}{" "}
            All
          </button>
          <button
            style={{ display: (state.cart.length === 0 && "none") || "block" }}
            className="checkout__remove__all"
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
        </div>
        <div className="cart__list">
          {state.cart.map((item) => (
            <div className="cart__item__card" key={item.id} id={item.id}>
              <div className="cart__checkbox__img">
                <input
                  type="checkbox"
                  className="cart__item__checkbox"
                  onChange={(event) => handleChange(event, item)}
                  checked={JSON.stringify(state.checkoutItems).includes(
                    item.id
                  )}
                />
                <img
                  src={item.image}
                  alt="cart__item__img"
                  className="cart__item__img"
                />
              </div>
              <div className="cart__item__details">
                <h3 className="cart__item__name">{item.name}</h3>
                <p className="cart__item__desc">
                  {item.desc || (
                    <>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Atque mollitia iure ad quasi ipsa blanditiis est odit.
                      Voluptates, fugit ducimus enim magni blanditiis autem.
                      Repellat tempora saepe modi quis quam.
                    </>
                  )}
                </p>
                <div className="cart__price__qty__controls">
                  <div className="qty__control">
                    <label htmlFor="cart__item__qty">Qty</label>
                    <input
                      type="number"
                      className="cart__item__qty"
                      name=""
                      id=""
                      min={0}
                      defaultValue={item.quantity}
                      onChange={(event) => handleChangeQuantity(event, item)}
                    />
                  </div>
                  <h3 className="cart__item__price">
                    $
                    {priceWithCommas(
                      parseFloat(item.price * item.quantity).toFixed(2)
                    )}
                  </h3>
                </div>
                <div className="cart__controls">
                  <button
                    className="remove__from__cart cart__remove__button"
                    onClick={() =>
                      handleRemoveFromCart(item, ACTIONS.REMOVE_ITEM)
                    }
                  >
                    Remove From Cart
                  </button>
                  <button
                    className="add__to__wishlist cart__wishlist__button"
                    onClick={() => handleAddToWishlist(item)}
                  >
                    Add To WishList
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
