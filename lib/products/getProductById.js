import crystalDropsKodi from "../kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/crystalDropsBaseKodi";

const allProducts = [...crystalDropsKodi];

export function getProductById(id) {
  return allProducts.find((product) => product.id === id);
}

export function getAllProducts() {
  return allProducts;
}
