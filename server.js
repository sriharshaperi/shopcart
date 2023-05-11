const express = require("express");
const cookieParser = require("cookie-parser");
const authServices = require("./services/auth-services");
const dataServices = require("./services/data-services");
const cartServices = require("./services/cart-services");
const wishListServices = require("./services/wishlist-services");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

authServices(app);
dataServices(app);
cartServices(app);
wishListServices(app);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
