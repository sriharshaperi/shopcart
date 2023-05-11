import React, { useContext, useState } from "react";
import { ACTIONS } from "../utils/constants";
import { priceWithCommas, sumUpQuantities } from "../utils/utils";
import { StateContext } from "./App";
import "./WishList.css";
import {
  fetchChangeQuantity,
  fetchClearWishList,
  fetchRemoveFromWishList,
  fetchRemoveMultiple,
} from "../apicalls/wishlist-apicalls";
import { fetchAddToCart } from "../apicalls/cart-apicalls";

function WishList() {
  const [state, dispatch] = useContext(StateContext);
  const [selectedWishListItems, setSelectedWishListItems] = useState([]);

  function handleChange(event, item) {
    const checked = event.target.checked;
    if (checked) {
      setSelectedWishListItems([...selectedWishListItems, item]);
    } else {
      setSelectedWishListItems(
        selectedWishListItems.filter((product) => product.id !== item.id)
      );
    }
  }

  function handleChangeQuantity(event, wishListItem) {
    const quantity = event.target.value;
    fetchChangeQuantity(wishListItem, quantity)
      .then(({ wishList }) => {
        dispatch({ type: ACTIONS.REPLACE_WISHLIST, wishList });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function removeSelected() {
    fetchRemoveMultiple(selectedWishListItems)
      .then(({ wishList }) => {
        dispatch({
          type: ACTIONS.REPLACE_WISHLIST,
          wishList,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function handleRemoveFromWishList(product, type) {
    fetchRemoveFromWishList(product, type)
      .then(({ wishList }) => {
        dispatch({
          type: ACTIONS.REPLACE_WISHLIST,
          wishList,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function handleAddToCart(product) {
    fetchAddToCart(product)
      .then(({ cart }) => {
        dispatch({ type: ACTIONS.REPLACE_CART, cart });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
    fetchRemoveFromWishList(product)
      .then(({ wishList }) => {
        dispatch({ type: ACTIONS.REPLACE_WISHLIST, wishList });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function handleRemoveAll() {
    fetchClearWishList()
      .then(({ wishList }) => {
        dispatch({
          type: ACTIONS.REPLACE_WISHLIST,
          wishList,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  return (
    <>
      {(state.wishList.length === 0 && (
        <h1 className="empty__wishlist__message">Your WishList Is Empty</h1>
      )) || (
        <h1 className="wishlist__items__display">
          Wish List({sumUpQuantities(state.wishList)})
        </h1>
      )}
      <div className="component__wishlist">
        <div className="wish__list__buttons">
          <button
            style={{
              display:
                state.wishList && state.wishList.length === 0
                  ? "none"
                  : "block",
            }}
            className="wishlist__remove__all"
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
          <button
            className="wishlist__remove__selected"
            style={{
              display:
                state.wishList.length === 0 ||
                selectedWishListItems.length === 0
                  ? "none"
                  : "block",
            }}
            onClick={removeSelected}
          >
            Remove Selected
          </button>
        </div>
        <div className="wishlist__items__list">
          {state.wishList.map((item) => (
            <div className="wishlist__item__card" key={item.id} id={item.id}>
              <div className="wishlist__checkbox__img">
                <input
                  type="checkbox"
                  className="wishlist__item__checkbox"
                  onChange={(event) => handleChange(event, item)}
                  checked={selectedWishListItems.includes(item)}
                />
                <img
                  src={item.image}
                  alt="wishlist__item__img"
                  className="wishlist__item__img"
                />
              </div>
              <div className="wishlist__item__details">
                <h3 className="wishlist__item__name">{item.name}</h3>
                <p className="wishlist__item__desc">
                  {item.desc || (
                    <>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Atque mollitia iure ad quasi ipsa blanditiis est odit.
                      Voluptates, fugit ducimus enim magni blanditiis autem.
                      Repellat tempora saepe modi quis quam.
                    </>
                  )}
                </p>
                <div className="wishlist__price__qty__controls">
                  <input
                    type="number"
                    className="wishlist__item__qty"
                    name=""
                    id=""
                    min={0}
                    defaultValue={item.quantity}
                    onChange={(event) => handleChangeQuantity(event, item)}
                  />
                  <h3 className="wishlist__item__price">
                    $
                    {priceWithCommas(
                      parseFloat(item.price * item.quantity).toFixed(2)
                    )}
                  </h3>
                </div>
                <div className="wishlist__controls">
                  <button
                    className="remove__from__wishlist"
                    onClick={() =>
                      handleRemoveFromWishList(item, ACTIONS.REMOVE_ITEM)
                    }
                  >
                    Remove From WishList
                  </button>
                  <button
                    className="add__to__cart wishlist__add__to__cart__buttton"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add To Cart
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

export default WishList;
