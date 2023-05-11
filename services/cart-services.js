const { cartFunctions } = require("../data/cart-data");
const sessions = require("../sessions");
const users = require("../users");
const { ACTIONS } = require("../constants");
const { isValidProduct } = require("../utils");

function cartServices(app) {
  app.get("/api/v1/cart", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const cartData = cartFunctions.getCartData(username);
    res.json({
      cart: cartData,
    });
  });

  app.put("/api/v1/cart/add-product", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "invalid-product" });
      return;
    }

    const updatedCart = cartFunctions.addToCart(product, username);
    res.json({
      cart: updatedCart,
    });
  });

  app.patch("/api/v1/cart/increase-quantity", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "invalid-product" });
      return;
    }

    const updatedCart = cartFunctions.addToCart(product, username);
    res.json({
      cart: updatedCart,
    });
  });

  app.patch("/api/v1/cart/decrease-quantity", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product, type } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "invalid-product" });
      return;
    }

    if (!type || type.trim() === "" || type !== ACTIONS.REDUCE_QUANTITY) {
      res.status(400).json({ error: "invalid-type" });
      return;
    }
    const updatedCart = cartFunctions.removeFromCart(product, type, username);
    res.json({
      cart: updatedCart,
    });
  });

  app.put("/api/v1/cart/remove-product", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product, type } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "invalid-product" });
      return;
    }

    if (!type || type.trim() === "" || type !== ACTIONS.REMOVE_ITEM) {
      res.status(400).json({ error: "invalid-type" });
      return;
    }
    const updatedCart = cartFunctions.removeFromCart(product, type, username);
    res.json({
      cart: updatedCart,
    });
  });

  app.delete("/api/v1/cart/clear-cart", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const updatedCart = cartFunctions.clearCart(username);
    res.json({
      cart: updatedCart,
    });
  });

  app.post("/api/v1/cart/checkout", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { checkoutItems } = req.body;

    if (!cartFunctions.hasValidCheckoutItems(checkoutItems, username)) {
      res.status(400).json({ error: "invalid-checkout-item" });
      return;
    }

    if (!cartFunctions.hasValidCheckoutQuantities(checkoutItems, username)) {
      res.status(400).json({ error: "invalid-checkout-item-quantity" });
      return;
    }

    if (checkoutItems.length === 0) {
      res.status(400).json({ error: "no items to checkout" });
      return;
    }

    if (!cartFunctions.checkout(checkoutItems, username)) {
      res.status(400).json({ error: "unsuccessful-checkout" });
      return;
    }

    res.status(200).json({
      message: "Your Checkout was successful. Thank you for shopping with us.",
      cart: cartFunctions.getCartData(username),
    });
  });

  app.patch("/api/v1/cart/change-quantity", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }

    const { cartItem, quantity } = req.body;

    if (!cartItem || !isValidProduct(cartItem) || isNaN(parseInt(quantity))) {
      res.status(400).json({ error: "invalid-product" });
      return;
    }

    const cart = cartFunctions.getCartData(username);
    const cartProduct = cart.find((product) => product.id === cartItem.id);
    if (cartProduct) {
      if (quantity > cartProduct.quantity) {
        cartFunctions.addToCart(cartItem, username);
      } else if (quantity < cartProduct.quantity) {
        cartFunctions.removeFromCart(
          cartItem,
          ACTIONS.REDUCE_QUANTITY,
          username
        );
      }
    }
    res.json({
      cart: cartFunctions.getCartData(username),
    });
  });
}

module.exports = cartServices;
