const { wishListFunctions } = require("../data/wishlist-data");
const { isValidProduct, hasValidProducts } = require("../utils");
const sessions = require("../sessions");
const users = require("../users");
const { ACTIONS } = require("../constants");

function wishListServices(app) {
  app.get("/api/v1/wishlist", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const wishListData = wishListFunctions.getWishListData(username);
    res.json({
      wishList: wishListData,
    });
  });

  app.put("/api/v1/wishlist/add-product", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "required-message-input" });
      return;
    }
    const updatedWishList = wishListFunctions.addToWishList(product, username);
    res.json({
      wishList: updatedWishList,
    });
  });

  app.patch("/api/v1/wishlist/increase-quantity", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "required-message-input" });
      return;
    }
    const updatedWishList = wishListFunctions.addToWishList(product, username);
    res.json({
      wishList: updatedWishList,
    });
  });

  app.patch("/api/v1/wishlist/decrease-quantity", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product, type } = req.body;

    if (!product || !isValidProduct(product)) {
      res.status(400).json({ error: "required-message-input" });
      return;
    }
    const updatedWishList = wishListFunctions.removeFromWishList(
      product,
      type,
      username
    );
    res.json({
      wishList: updatedWishList,
    });
  });

  app.delete("/api/v1/wishlist/remove-product", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { product, type } = req.body;

    if (!product || !isValidProduct(product) || !type === ACTIONS.REMOVE_ITEM) {
      res.status(400).json({ error: "required-message-input" });
      return;
    }
    const updatedWishList = wishListFunctions.removeFromWishList(
      product,
      type,
      username
    );
    res.json({
      wishList: updatedWishList,
    });
  });

  app.delete("/api/v1/wishlist/remove-multiple", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { products } = req.body;

    if (!products || !hasValidProducts(products)) {
      res.status(400).json({ error: "required-message-input" });
      return;
    }
    const updatedWishList = wishListFunctions.removeMultipleItems(
      products,
      username
    );
    res.json({
      wishList: updatedWishList,
    });
  });

  app.delete("/api/v1/wishlist/clear-wishlist", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }

    const updatedWishList = wishListFunctions.clearWishList(username);
    res.json({
      wishList: updatedWishList,
    });
  });

  app.patch("/api/v1/wishlist/change-quantity", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }

    const { wishListItem, quantity } = req.body;

    if (
      !wishListItem ||
      !isValidProduct(wishListItem) ||
      isNaN(parseInt(quantity))
    ) {
      res.status(400).json({ error: "invalid-product" });
      return;
    }

    const wishlist = wishListFunctions.getWishListData(username);
    const wishListProduct = wishlist.find(
      (product) => product.id === wishListItem.id
    );
    if (wishListProduct) {
      if (quantity > wishListProduct.quantity) {
        wishListFunctions.addToWishList(wishListItem, username);
      } else if (quantity < wishListProduct.quantity) {
        wishListFunctions.removeFromWishList(
          wishListItem,
          ACTIONS.REDUCE_QUANTITY,
          username
        );
      }
    }
    res.json({
      wishList: wishListFunctions.getWishListData(username),
    });
  });
}

module.exports = wishListServices;
