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
}) {
  const handleCheckbox = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <StyledFilters>
      {/* Колекції */}
      {collections.length > 0 && (
        <StyledFilterBlock>
          <StyledFilterTitle>Колекції</StyledFilterTitle>

          <StyledFilterList>
            {collections.map((collection) => (
              <StyledFilterItem key={collection}>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    checked={filters.collections.includes(collection)}
                    onChange={() =>
                      handleCheckbox("collections", collection)
                    }
                  />

                  {collection}
                </label>
              </StyledFilterItem>
            ))}
          </StyledFilterList>
        </StyledFilterBlock>
      )}

      {/* Кольори */}
      {colors.length > 0 && (
        <StyledFilterBlock>
          <StyledFilterTitle>Кольори</StyledFilterTitle>

          <StyledFilterList>
            {colors.map((color) => (
              <StyledFilterItem key={color.name}>
                <label>
                  <StyledCheckbox
                    type="checkbox"
                    checked={filters.colors.includes(color.name)}
                    onChange={() =>
                      handleCheckbox("colors", color.name)
                    }
                  />

                  <StyledColor
                    style={{ backgroundColor: color.code }}
                  />

                  {color.label}
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