import { categories } from "../data/categories";
import { LIMIT } from "./constants";

export function getPaginationOffsets(selection, offset1, offset2) {
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

export function sumUpQuantities(cart = []) {
  let totalProducts = 0;
  cart.forEach((product) => {
    totalProducts += product.quantity;
  });
  return totalProducts || 0;
}

export function sumUpPrice(cart = []) {
  let subTotal = 0;
  cart.forEach((product) => {
    subTotal += product.price * product.quantity;
  });
  return subTotal || 0;
}

export function priceWithCommas(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getResultsBySearchInput(products, searchInput) {
  return products.filter((product) => {
    return new RegExp(searchInput.toLowerCase(), "g").test(
      product.name.toLowerCase()
    );
  });
}
