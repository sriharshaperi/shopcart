export function fetchWishListData() {
  return fetch("/api/v1/wishlist", {
    method: "GET",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchAddToWishList(product) {
  return fetch("/api/v1/wishlist/add-product", {
    method: "PUT",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ product }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchIncreaseQuantity(product) {
  return fetch(`/api/v1/wishlist/increase-quantity`, {
    method: "PATCH",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ product }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchDecreaseQuantity(product) {
  return fetch(`/api/v1/wishlist/decrease-quantity`, {
    method: "PATCH",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ product }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchChangeQuantity(wishListItem, quantity) {
  return fetch(`/api/v1/cart/change-quantity`, {
    method: "PATCH",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ wishListItem, quantity }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchRemoveFromWishList(product, type) {
  return fetch(`/api/v1/wishlist/remove-product`, {
    method: "DELETE",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ product, type }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchRemoveMultiple(products) {
  return fetch(`/api/v1/wishlist/remove-multiple`, {
    method: "DELETE",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ products }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchClearWishList() {
  return fetch(`/api/v1/wishlist/clear-wishlist`, {
    method: "DELETE",
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}
