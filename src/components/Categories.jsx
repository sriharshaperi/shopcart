import React, { useContext, useEffect, useState } from "react";
import "./Categories.css";
import { ACTIONS, COMPONENTS, LIMIT } from "../utils/constants";
import { getPaginationOffsets } from "../utils/utils";
import Pagination from "./Pagination";
import { StateContext } from "./App";
import { fetchCategoriesData } from "../apicalls/data-apicalls";

function Categories() {
  const [state, dispatch] = useContext(StateContext);
  const [categories, setCategories] = useState([]);

  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(LIMIT);
  useEffect(() => {
    fetchCategoriesData()
      .then(({ categories }) => setCategories(categories))
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }, []);

  function handleClick(category) {
    dispatch({ type: ACTIONS.SET_CATEGORY, activeCategory: category });
    dispatch({
      type: ACTIONS.SET_COMPONENT,
      activeComponent: COMPONENTS.PRODUCTS,
    });
  }

  function handlePagination(selection) {
    const values = getPaginationOffsets(selection, offset1, offset2);
    const { newOffset1, newOffset2 } = values;
    setOffset1(newOffset1);
    setOffset2(newOffset2);
  }

  return (
    <div className="component__categories">
      <div className="categories__title__display">
        <h4 className="categories__title">Product Categories</h4>
      </div>
      <ul className="categories__list">
        {categories.slice(offset1, offset2).map((data, index) => (
          <li
            key={data.id}
            id={data.id}
            className="component__category"
            onClick={() => handleClick(data.name)}
          >
            <div className="category__image__section">
              <img
                className="category__image"
                src={data.image}
                alt="category_image"
              />
            </div>
            <h3 className="category__name">{data.name}</h3>
          </li>
        ))}
      </ul>
      <Pagination
        offset1={offset1}
        offset2={offset2}
        data={categories}
        handlePagination={handlePagination}
      />
    </div>
  );
}

export default Categories;
