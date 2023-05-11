const { ACTIONS } = require("../constants");
const wishListData = {};

const wishListFunctions = {};

wishListFunctions.createWishListForUser = function createWishListForUser(
  username
) {
  if (!wishListData[username]) {
    wishListData[username] = [];
  }
  return wishListData[username];
};

wishListFunctions.addToWishList = function addToWishList(product, username) {
  const wishList = wishListData[username];
  const wishListProduct = wishList.find((data) => data.id === product.id);
  if (wishListProduct) {
    wishListProduct.quantity = wishListProduct.quantity + 1;
  } else wishList.push({ ...product, quantity: product.quantity || 1 });

  return wishList;
};

wishListFunctions.removeFromWishList = function removeFromWishList(
  product,
  type,
  username
) {
  let wishList = wishListData[username];
  const wishListProduct = wishList.find((data) => data.id === product.id);
  if (type === ACTIONS.REDUCE_QUANTITY) {
    if (wishListProduct && wishListProduct.quantity > 1) {
      wishListProduct.quantity = wishListProduct.quantity - 1;
    } else wishList = wishList.filter((data) => data.id !== product.id);
  } else if (type === ACTIONS.REMOVE_ITEM)
    wishList = wishList.filter((data) => data.id !== product.id);

  return (wishListData[username] = wishList);
};

wishListFunctions.getWishListData = function getWishListData(username) {
  return wishListData[username];
};

wishListFunctions.clearWishList = function clearWishList(username) {
  return (wishListData[username] = []);
};

wishListFunctions.replaceWishList = function replaceWishList(
  updatedWishList = [],
  username
) {
  return (wishListData[username] = updatedWishList);
};

wishListFunctions.removeMultipleItems = function removeMultipleItems(
  products,
  username
) {
  products.forEach((product) => {
    this.removeFromWishList(product, ACTIONS.REMOVE_ITEM, username);
  });

  return wishListData[username];
};

module.exports = { wishListFunctions };
