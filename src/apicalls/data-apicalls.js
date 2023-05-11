export function fetchCategoriesData(offset1, offset2) {
  return fetch(`/api/v1/categories?offset1=${offset1}&offset2=${offset2}`, {
    method: "GET",
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

export function fetchSearchProductsData(searchInput) {
  return fetch(`/api/v1/products?searchInput=${searchInput}`, {
    method: "GET",
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

export function fetchProductsData() {
  return fetch("/api/v1/products", {
    method: "GET",
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
