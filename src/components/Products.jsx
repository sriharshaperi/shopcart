import React, { useContext, useEffect, useState } from "react";
import { products } from "../data/products";
import { getPaginationOffsets, getResultsBySearchInput } from "../utils/utils";
import { ACTIONS, LIMIT, COMPONENTS } from "../utils/constants";
import Pagination from "./Pagination";
import "./Products.css";
import AddToCart from "./AddToCart";
import { StateContext } from "./App";

function Products() {
  const [state, dispatch] = useContext(StateContext);

  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(LIMIT);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    toggleResultsByCategoryOrSearchInput();
  }, [state.searchInput]);

  function toggleResultsByCategoryOrSearchInput() {
    if (state.searchInput) {
      const searchFilteredArray = getResultsBySearchInput(
        products,
        state.searchInput
      );
      dispatch({
        type: ACTIONS.SET_CATEGORY,
        activeCategory:
          (searchFilteredArray.length > 0 && searchFilteredArray[0].category) ||
          "",
      });
      setFilteredProducts(searchFilteredArray);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === state.activeCategory)
      );
    }
  }

  function handlePagination(selection) {
    const values = getPaginationOffsets(selection, offset1, offset2);
    const { newOffset1, newOffset2 } = values;
    setOffset1(newOffset1);
    setOffset2(newOffset2);
  }

  function renderProductPage(data) {
    dispatch({
      type: ACTIONS.SET_COMPONENT,
      activeComponent: COMPONENTS.PRODUCT,
    });
    dispatch({ type: ACTIONS.ACTIVE_PRODUCT_DATA, activeProductData: data });
  }

  return (
    <div className="component__products">
      <div className="category__display">
        <h4 className="active__category__display">{state.activeCategory}</h4>
      </div>
      <div className="products__list">
        {filteredProducts.slice(offset1, offset2).map((data, index) => (
          <div
            className="product__card"
            onClick={(event) => renderProductPage(data)}
            key={data.id}
            id={data.id}
          >
            <img
              className="product__card__image"
              src={data.image}
              alt="product__card__image"
            />
            <h3 className="product__card__name">{data.name}</h3>
            <h2 className="product__card__price">${data.price}</h2>
            <AddToCart product={data} />
          </div>
        ))}
      </div>
      {(filteredProducts.length > 0 && (
        <Pagination
          offset1={offset1}
          offset2={offset2}
          data={filteredProducts}
          handlePagination={handlePagination}
        />
      )) || <h2 className="no__results__found">No Results Found</h2>}
    </div>
  );
}

export default Products;
