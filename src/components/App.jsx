import { createContext, useEffect, useReducer } from "react";
import "./App.css";
import Login from "./Login";
import { reducer } from "../state/reducer";
import { initialState } from "../state/state";
import {
  LOGIN_STATUS,
  COMPONENTS,
  ACTIONS,
  SERVER,
  CLIENT,
} from "../utils/constants";
import Loading from "./Loading";
import Categories from "./Categories";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Navbar from "./Navbar";
import WishList from "./WishList";
import { fetchSession } from "../apicalls/auth-apicalls";
import { fetchCartData } from "../apicalls/cart-apicalls";
import { fetchWishListData } from "../apicalls/wishlist-apicalls";

export const StateContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchSession()
      .then((session) => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchCartData();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(({ cart }) => {
        dispatch({ type: ACTIONS.REPLACE_CART, cart });
        fetchWishListData().then(({ wishList }) => {
          dispatch({ type: ACTIONS.REPLACE_WISHLIST, wishList });
        });
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
      });
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <div className="App">
        {(state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login />) ||
          (state.loginStatus === LOGIN_STATUS.PENDING && (
            <Loading
              children={
                (!state.username && "Logging In...") || "Logging Out..."
              }
            />
          )) ||
          (state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
            <>
              <Navbar />
              <div className="component__home">
                {(state.activeComponent === COMPONENTS.CATEGORIES && (
                  <Categories />
                )) ||
                  (state.activeComponent === COMPONENTS.PRODUCTS && (
                    <Products />
                  )) ||
                  (state.activeComponent === COMPONENTS.PRODUCT && (
                    <Product />
                  )) ||
                  (state.activeComponent === COMPONENTS.CART && <Cart />) ||
                  (state.activeComponent === COMPONENTS.WISHLIST && (
                    <WishList />
                  )) ||
                  (state.activeComponent === COMPONENTS.CHECKOUT && (
                    <Checkout />
                  ))}
              </div>
            </>
          ))}
      </div>
    </StateContext.Provider>
  );
}

export default App;
