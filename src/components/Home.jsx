import React, { useReducer } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Drawer from "./Drawer";
import Categories from "./Categories";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { reducer } from "../state/reducer";
import { initialState } from "../state/state";
import { COMPONENTS } from "../utils/constants";

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function renderComponent() {
    switch (state.activeComponent) {
      case COMPONENTS.CATEGORIES:
        return <Categories />;
      case COMPONENTS.PRODUCTS:
        return <Products />;
      case COMPONENTS.PRODUCT:
        return <Product />;
      case COMPONENTS.CART:
        return <Cart />;
      case COMPONENTS.CHECKOUT:
        return <Checkout />;
      default:
        return <Categories />;
    }
  }

  return (
    <div className="component__home">
      Home Component
      <Drawer />
      <Navbar />
      {renderComponent()}
      <Footer />
    </div>
  );
}

export default Home;
