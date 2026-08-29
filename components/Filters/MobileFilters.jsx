import { HiXMark } from "react-icons/hi2";

import {
  StyledFilterOverlay,
  StyledMobileFilters,
  StyledMobileFiltersHeader,
  StyledCloseButton,
} from "./StyledFilters";

import Filters from "./Filters";

export default function MobileFilters({
  open,
  onClose,
  categories,
  collections,
  colors,
  volumes,
  brands,
  filters,
  setFilters,
}) {
  if (!open) return null;

  return (
    <>
      <StyledFilterOverlay onClick={onClose} />

      <StyledMobileFilters>
        <StyledMobileFiltersHeader>
          <h2>Фільтри</h2>

          <StyledCloseButton onClick={onClose}>
            <HiXMark />
          </StyledCloseButton>
        </StyledMobileFiltersHeader>

        
        <Filters
          mobile
          categories={categories}
          collections={collections}
          colors={colors}
          volumes={volumes}
          brands={brands}
          filters={filters}
          setFilters={setFilters}
        />
      </StyledMobileFilters>
    </>
  );
}