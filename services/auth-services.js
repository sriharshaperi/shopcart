const { cartFunctions } = require("../data/cart-data");
const { wishListFunctions } = require("../data/wishlist-data");
const sessions = require("../sessions");

const users = require("../users");

function authServices(app) {
  app.get("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    res.json({
      username: username,
      cart: cartFunctions.getCartData(username),
      wishList: wishListFunctions.getWishListData(username),
    });
  });

  app.post("/api/v1/session", (req, res) => {
    const { username } = req.body;

    if (!users.isValid(username)) {
      res.status(400).json({ error: "required-username" });
      return;
    }

    if (username === "dog") {
      res.status(403).json({ error: "auth-insufficient" });
      return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if (!existingUserData) {
      const newCart = cartFunctions.createCartForUser(username);
      const newWishList = wishListFunctions.createWishListForUser(username);
      users.addUserData(username, {
        username,
        cart: newCart,
        wishList: newWishList,
      });
    }

    const userData = users.getUserData(username);

    res.cookie("sid", sid);
    res.json({
      userData,
    });
  });

  app.delete("/api/v1/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (sid) {
      res.clearCookie("sid");
    }

    if (username) {
      sessions.deleteSession(sid);
    }

    res.json({ username });
  });
}

module.exports = authServices;
