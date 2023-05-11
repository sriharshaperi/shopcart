import { ACTIONS } from "../utils/constants";
const cartData = {
  cart: [],
};

export const cartFunctions = {};

cartFunctions.addToCart = function addToCart(product) {
  const cartProduct = cartData.cart.find((data) => data.id === product.id);
  if (cartProduct) {
    cartProduct.quantity = cartProduct.quantity + 1;
  } else cartData.cart.push({ ...product, quantity: product.quantity || 1 });
};

cartFunctions.removeFromCart = function removeFromCart(product, type) {
  const cartProduct = cartData.cart.find((data) => data.id === product.id);
  if (type === ACTIONS.REDUCE_QUANTITY) {
    if (cartProduct && cartProduct.quantity > 1) {
      cartProduct.quantity = cartProduct.quantity - 1;
    } else
      cartData.cart = cartData.cart.filter((data) => data.id !== product.id);
  } else if (type === ACTIONS.REMOVE_ITEM)
    cartData.cart = cartData.cart.filter((data) => data.id !== product.id);
};

cartFunctions.getCartData = function getCartData() {
  return cartData.cart;
};

cartFunctions.clearCart = function clearCart() {
  return (cartData.cart = []);
};

cartFunctions.replaceCart = function replaceCart(updatedCart = []) {
  return (cartData.cart = updatedCart);
};
