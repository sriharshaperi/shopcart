import React, { useContext, useState } from "react";
import { sumUpQuantities, sumUpPrice, priceWithCommas } from "../utils/utils";
import { StateContext } from "./App";
import { ACTIONS } from "../utils/constants";
import Dialog from "./Dialog";
import "./Checkout.css";
import { fetchCheckout } from "../apicalls/cart-apicalls";

function Checkout() {
  const [state, dispatch] = useContext(StateContext);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [dialog, setDialog] = useState({
    show: false,
    content: "",
  });

  function handleCheckout() {
    if (state.checkoutItems.length > 0) {
      fetchCheckout(state.checkoutItems)
        .then((response) => {
          setCheckoutProcessing(true);
          setTimeout(() => {
            setDialog({ show: true, content: response.message });
            dispatch({
              type: ACTIONS.REPLACE_CART,
              cart: response.cart,
            });
            dispatch({
              type: ACTIONS.REPLACE_CHECKOUT_ITEMS,
              checkoutItems: [],
            });
            setCheckoutProcessing(false);
          }, 2000);
        })
        .catch((err) => {
          dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
        });
    } else
      setDialog({
        show: true,
        content:
          "No items to checkout. Select items from cart or add items to cart and select if cart is empty",
      });
  }

  return (
    <>
      <div className="subtotal__details">
        <h4 className="subtotal__title">Checkout</h4>
        <div className="subtotal_items">
          <h3 className="subtotal__quantities">
            Checkout Items :{sumUpQuantities(state.checkoutItems)}
          </h3>
          <h1 className="subtotal__value">
            Subtotal : $
            {priceWithCommas(
              parseFloat(sumUpPrice(state.checkoutItems)).toFixed(2)
            )}
          </h1>
          <button
            disabled={checkoutProcessing}
            className="checkout trigger"
            onClick={handleCheckout}
          >
            {(checkoutProcessing && "Processing...") || "Checkout"}
          </button>
        </div>
      </div>
      <Dialog
        show={dialog.show}
        onClose={() => setDialog({ ...dialog, show: false })}
        content={dialog.content}
      />
    </>
  );
}

export default Checkout;
