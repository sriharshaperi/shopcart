const CATEGORIES = {
  CASUAL_WEAR_MEN: "Men's Casual Wears",
  FORMAL_WEAR_MEN: "Men's Formal Wears",
  SPORTS_WEAR_MEN: "Men's Sports Wears",
  CASUAL_WEAR_WOMEN: "Women's Casual Wears",
  FORMAL_WEAR_WOMEN: "Women's Formal Wears",
  SPORTS_WEAR_WOMEN: "Women's Sports Wears",
  CASUAL_WEAR_KIDS: "Kid's Casual Wears",
  FORMAL_WEAR_KIDS: "Kid's Formal Wears",
  SPORTS_WEAR_KIDS: "Kid's Sports Wears",
};

const ACTIONS = {
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  PENDING: "pending",
  REPLACE_CART: "replaceCart",
  REPLACE_CHECKOUT_ITEMS: "replaceCheckoutItems",
  REPLACE_WISHLIST: "replaceWishList",
  REPORT_ERROR: "reportError",
  ADD_TO_CART: "addToCart",
  REMOVE_FROM_CART: "removeFromCart",
  SET_COMPONENT: "setComponent",
  SET_CATEGORY: "setCategory",
  REDUCE_QUANTITY: "reduceQuantity",
  REMOVE_ITEM: "removeItem",
  SET_SEARCH_INPUT: "setSearchInput",
};

const LIMIT = 3;

module.exports = {
  ACTIONS,
  CATEGORIES,
  LIMIT,
};
