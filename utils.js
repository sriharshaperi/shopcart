const { LIMIT } = require("./constants");
const { categories } = require("./data/categories-data");
const { products } = require("./data/products-data");

function getPaginationOffsets(selection, offset1 = 0, offset2 = LIMIT) {
  let newOffset1, newOffset2;

  switch (selection) {
    case "prev":
      if (offset1 >= 0) newOffset1 = offset1 - LIMIT;
      else newOffset1 = 0;

      if (offset2 >= LIMIT) newOffset2 = offset2 - LIMIT;
      else newOffset2 = LIMIT;
      break;
    case "next":
      if (offset1 < categories.length) newOffset1 = offset1 + LIMIT;
      else newOffset1 = categories.length - 1;

      newOffset2 = offset2 + LIMIT;
      break;

    default:
      newOffset1 = 0;
      newOffset2 = LIMIT;
      break;
  }

  return { newOffset1, newOffset2 };
}

function getResultsBySearchInput(products, searchInput) {
  return products.filter((product) => {
    return new RegExp(searchInput.toLowerCase(), "g").test(
      product.name.toLowerCase()
    );
  });
}

function isValidProduct(product) {
  return JSON.stringify(products).includes(JSON.stringify(product.name));
}

function hasValidProducts(products) {
  let hasValidProducts = true;
  for (let index = 0; index < products.length; index++) {
    if (!isValidProduct(products[index])) {
      hasValidProducts = false;
      break;
    }
  }
  return hasValidProducts;
}

module.exports = {
  getPaginationOffsets,
  getResultsBySearchInput,
  isValidProduct,
  hasValidProducts,
};
