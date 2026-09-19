import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const globalNamespaces = ["common", "brandsCatalog", "kodiCatalogList"];

export default async function getPageTranslations(locale, pageNamespaces = []) {
  const namespaces = [...new Set([...globalNamespaces, ...pageNamespaces])];

  return await serverSideTranslations(locale, namespaces);
}
