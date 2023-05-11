import { LOGIN_STATUS } from "../utils/constants";
export function loginAction(state, action) {
  return {
    ...state,
    error: "",
    loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
    username: action.username,
  };
}

export function loginPendingAction(state, action) {
  return {
    ...state,
    error: "",
    loginStatus: LOGIN_STATUS.PENDING,
  };
}

export function replaceCartAction(state, action) {
  return {
    ...state,
    error: "",
    cart: action.cart,
  };
}

export function replaceCheckoutItemsAction(state, action) {
  return {
    ...state,
    error: "",
    checkoutItems: action.checkoutItems,
  };
}

export function replaceWishListAction(state, action) {
  return {
    ...state,
    error: "",
    wishList: action.wishList,
  };
}

export function logoutAction(state, action) {
  return {
    ...state,
    error: "",
    cart: [],
    loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
    username: "",
  };
}

export function reportErrorAction(state, action) {
  return {
    ...state,
    error: action.error || "ERROR",
  };
}

export function addToCartAction(state, action) {
  return {
    ...state,
    cart: [...state.cart, action.product],
    error: "",
  };
}

export function removeFromCartAction(state, action) {
  return {
    ...state,
    cart: state.cart.filter((product) => product.pid !== action.pid),
    error: "",
  };
}

export function setComponentAction(state, action) {
  return {
    ...state,
    activeComponent: action.activeComponent,
  };
}

export function setCategoryAction(state, action) {
  return {
    ...state,
    activeCategory: action.activeCategory,
  };
}

export function setSearchInputAction(state, action) {
  return {
    ...state,
    searchInput: action.searchInput,
  };
}

export function setActiveProductDataAction(state, action) {
  return {
    ...state,
    error: "",
    activeProductData: action.activeProductData,
  };
}
