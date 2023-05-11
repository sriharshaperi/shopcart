import { ACTIONS, CLIENT } from "../utils/constants";
import {
  loginAction,
  addToCartAction,
  loginPendingAction,
  logoutAction,
  removeFromCartAction,
  replaceCartAction,
  reportErrorAction,
  setComponentAction,
  setCategoryAction,
  replaceCheckoutItemsAction,
  setSearchInputAction,
  replaceWishListAction,
  setActiveProductDataAction,
} from "./actions";
export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return loginAction(state, action);
    case ACTIONS.PENDING:
      return loginPendingAction(state, action);
    case ACTIONS.REPLACE_CART:
      return replaceCartAction(state, action);
    case ACTIONS.REPLACE_CHECKOUT_ITEMS:
      return replaceCheckoutItemsAction(state, action);
    case ACTIONS.LOG_OUT:
      return logoutAction(state, action);
    case ACTIONS.ADD_TO_CART:
      return addToCartAction(state, action);
    case ACTIONS.REMOVE_FROM_CART:
      return removeFromCartAction(state, action);
    case ACTIONS.REPORT_ERROR:
      return reportErrorAction(state, action);
    case ACTIONS.SET_COMPONENT:
      return setComponentAction(state, action);
    case ACTIONS.SET_CATEGORY:
      return setCategoryAction(state, action);
    case ACTIONS.SET_SEARCH_INPUT:
      return setSearchInputAction(state, action);
    case ACTIONS.REPLACE_WISHLIST:
      return replaceWishListAction(state, action);
    case ACTIONS.ACTIVE_PRODUCT_DATA:
      return setActiveProductDataAction(state, action);

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}
