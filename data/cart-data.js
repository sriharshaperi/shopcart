const { ACTIONS } = require("../constants");

const cartData = {};

const cartFunctions = {};

cartFunctions.createCartForUser = function createCartForUser(username) {
  if (!cartData[username]) {
    cartData[username] = [];
  }
  return cartData[username];
};

cartFunctions.addToCart = function addToCart(product, username) {
  const cart = cartData[username];
  const cartProduct = cart.find((data) => data.id === product.id);
  if (cartProduct) {
    cartProduct.quantity = cartProduct.quantity + 1;
  } else
    cart.push({ ...product, quantity: (product && product.quantity) || 1 });
  return cart;
};

cartFunctions.removeFromCart = function removeFromCart(
  product,
  type,
  username
) {
  let cart = cartData[username];
  const cartProduct = cart.find((data) => data.id === product.id);
  if (type === ACTIONS.REDUCE_QUANTITY) {
    if (cartProduct && cartProduct.quantity > 1) {
      cartProduct.quantity = cartProduct.quantity - 1;
    } else cart = cart.filter((data) => data.id !== product.id);
  } else if (type === ACTIONS.REMOVE_ITEM)
    cart = cart.filter((data) => data.id !== product.id);
  return (cartData[username] = cart);
};

cartFunctions.getCartData = function getCartData(username) {
  return cartData[username];
};

cartFunctions.clearCart = function clearCart(username) {
  return (cartData[username] = []);
};

cartFunctions.replaceCart = function replaceCart(updatedCart = [], username) {
  return (cartData[username] = updatedCart);
};

cartFunctions.checkout = function checkout(checkoutItems, username) {
  let cart = cartData[username];
  let isCheckoutSuccessful = true;
  for (let index = 0; index < checkoutItems.length; index++) {
    const cartProduct = cart.find(
      (product) => product.id === checkoutItems[index].id
    );
    if (!cartProduct) {
      isCheckoutSuccessful = false;
      break;
    }
    cartProduct.quantity = cartProduct.quantity - checkoutItems[index].quantity;
    if (cartProduct.quantity <= 0)
      cart = this.removeFromCart(cartProduct, ACTIONS.REMOVE_ITEM, username);
  }
  cartData[username] = cart;
  return isCheckoutSuccessful;
};

cartFunctions.contains = function contains(product, username) {
  const cart = cartData[username];
  return JSON.stringify(cart).includes(JSON.stringify(product.name));
};

cartFunctions.hasValidCheckoutItems = function hasValidCheckoutItems(
  checkoutItems,
  username
) {
  let isValid = true;
  if (!checkoutItems) isValid = false;
  for (let index = 0; index < checkoutItems.length; index++) {
    if (!this.contains(checkoutItems[index], username)) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

cartFunctions.hasValidCheckoutQuantities = function hasValidCheckoutQuantities(
  checkoutItems,
  username
) {
  const cart = cartData[username];
  let isValid = true;
  for (let index = 0; index < checkoutItems.length; index++) {
    const cartItem = cart.find(
      (product) => product.id === checkoutItems[index].id
    );
    if (!cartItem) {
      isValid = false;
      break;
    } else if (
      isNaN(checkoutItems[index].quantity) ||
      checkoutItems[index].quantity > cartItem.quantity
    ) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

module.exports = {
  cartFunctions,
};
