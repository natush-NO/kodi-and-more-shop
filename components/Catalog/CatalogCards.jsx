import { useTranslation } from "next-i18next";

import CatalogCard from "./CatalogCard";
import { Grid } from "../shared/Grid";

export default function CatalogCards({
  items,
  namespace,
}) {
  const { t } = useTranslation(namespace);

  return (
    <Grid>
      {items.map((item) => (
        <CatalogCard
          key={item.id}
          image={item.image}
          title={t(item.titleKey)}
          href={item.href}
        />
      ))}
    </Grid>
  );
}