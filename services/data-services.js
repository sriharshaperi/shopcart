const { products } = require("../data/products-data");
const { categories } = require("../data/categories-data");
const sessions = require("../sessions");
const users = require("../users");

function dataServices(app) {
  app.get("/api/v1/categories", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    res.json({
      categories: categories,
    });
  });

  app.get("/api/v1/products", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    res.json({
      products: products,
    });
  });
}

module.exports = dataServices;
