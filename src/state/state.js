import { LOGIN_STATUS } from "../utils/constants";
export const initialState = {
  username: "",
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  cart: [],
  checkoutItems: [],
  wishList: [],
  searchInput: "",
  error: "",
  activeComponent: "",
  activeCategory: "",
  activeProductData: {},
};
