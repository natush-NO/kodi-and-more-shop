import crystalDropsKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/crystalDropsBaseKodi";

const allProducts = crystalDropsKodi.map((product) => ({
  ...product,
  translationNamespace: "crystalDropsKodi",
  href: `/product/${product.id}`,
}));

export default allProducts;
