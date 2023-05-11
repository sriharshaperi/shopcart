export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_MESSAGE_INPUT: "required-message-input",
  TASK_MISSING: "noSuchId",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  UNKNOWN_ACTION: "unknownAction",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  [SERVER.AUTH_INSUFFICIENT]:
    "Your username/password combination does not match any records, please try again.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username",
  [SERVER.REQUIRED_TASK]: "Please enter the task to do",
  [SERVER.REQUIRED_MESSAGE_INPUT]: "Please enter a valid message",
  default: "Something went wrong.  Please try again",
};

export const ACTIONS = {
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
  ACTIVE_PRODUCT_DATA: "activeProductData",
};

export const COMPONENTS = {
  CATEGORIES: "categories",
  PRODUCTS: "products",
  PRODUCT: "product",
  CART: "cart",
  CHECKOUT: "checkout",
  WISHLIST: "wishlist",
};

export const CATEGORIES = {
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

export const LIMIT = 3;
