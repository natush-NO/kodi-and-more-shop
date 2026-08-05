import { useTranslation } from "next-i18next";
import {
  StyledFilters,
  StyledFilterBlock,
  StyledFilterTitle,
  StyledFilterList,
  StyledFilterItem,
  StyledCheckbox,
  StyledColor,
} from "./StyledFilters";

export default function Filters({
  collections = [],
  colors = [],
  volumes = [],
  filters,
  setFilters,
  brands = [],
})
{
  const handleCheckbox = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };
const { t } = useTranslation("colors");
  
  return (
    <StyledFilters>
    {/* Бренди та колекції */}
{brands.length > 0 && (
  <StyledFilterBlock>
    <StyledFilterTitle>Бренди</StyledFilterTitle>

    {brands.map((brand) => {
      const brandCollections = collections.filter(
        (collection) => collection.brand === brand.id
      );

      return (
        <div key={brand.id}>
          <StyledFilterItem>
            <label>
              <StyledCheckbox
                type="checkbox"
                checked={filters.brands.includes(brand.id)}
                onChange={() =>
                  handleCheckbox("brands", brand.id)
                }
              />

              <strong>{brand.name}</strong>
            </label>
          </StyledFilterItem>

          {brandCollections.length > 0 && (
            <StyledFilterList>
              {brandCollections.map((collection) => (
                <StyledFilterItem
                  key={collection.id}
                  style={{ marginLeft: "24px" }}
                >
                  <label>
                    <StyledCheckbox
                      type="checkbox"
                      checked={filters.collections.includes(
                        collection.id
                      )}
                      onChange={() =>
                        handleCheckbox(
                          "collections",
                          collection.id
                        )
                      }
                    />

                    {collection.name}
                  </label>
                </StyledFilterItem>
              ))}
            </StyledFilterList>
          )}
        </div>
      );
    })}
  </StyledFilterBlock>
)}

      {/* Кольори */}
      {colors.length > 0 && (
        <StyledFilterBlock>
          <StyledFilterTitle>Кольори</StyledFilterTitle>

          <StyledFilterList>
{colors.map((color) => (
  <StyledFilterItem key={color.id}>
    <label>
      <StyledCheckbox
        type="checkbox"
        checked={filters.colors.includes(color.id)}
        onChange={() =>
          handleCheckbox("colors", color.id)
        }
      />

      <StyledColor
        style={{ backgroundColor: color.code }}
      />

      {t(color.titleKey)}
    </label>
  </StyledFilterItem>
))}
          </StyledFilterList>
        </StyledFilterBlock>
      )}

      {/* Об'єм */}
      {volumes.length > 0 && (
        <StyledFilterBlock>
          <StyledFilterTitle>Об'єм</StyledFilterTitle>

          <StyledFilterList>
            {volumes.map((volume) => (
              <StyledFilterItem key={volume}>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    checked={filters.volumes.includes(volume)}
                    onChange={() =>
                      handleCheckbox("volumes", volume)
                    }
                  />

                  {volume} мл
                </label>
              </StyledFilterItem>
            ))}
          </StyledFilterList>
        </StyledFilterBlock>
      )}


    </StyledFilters>
  );
}