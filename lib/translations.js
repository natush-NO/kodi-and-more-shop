import fs from "fs";
import path from "path";

const translationsCache = {};

function loadTranslations(locale) {
  if (translationsCache[locale]) {
    return translationsCache[locale];
  }

  const localeDirectory = path.join(process.cwd(), "public", "locales", locale);

  const translations = {};

  const files = fs.readdirSync(localeDirectory);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = path.join(localeDirectory, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    Object.assign(translations, content);
  }

  translationsCache[locale] = translations;

  return translations;
}

export function getProductTranslation(titleKey, locale = "uk") {
  if (!titleKey) return "Товар";

  const safeLocale = locale === "en" ? "en" : "uk";

  try {
    const translations = loadTranslations(safeLocale);

    const result = titleKey
      .split(".")
      .reduce((object, key) => object?.[key], translations);

    return typeof result === "string" ? result : titleKey;
  } catch (error) {
    console.error("Translation error:", error);
    return titleKey;
  }
}
