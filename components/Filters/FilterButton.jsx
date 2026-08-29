import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import {
  StyledFilterButtonWrapper,
  StyledOpenFiltersButton,
} from "./StyledFilters";

export default function FilterButton({ onClick }) {
  return (
    <StyledFilterButtonWrapper>
      <StyledOpenFiltersButton onClick={onClick}>
        <HiAdjustmentsHorizontal />
        Фільтри
      </StyledOpenFiltersButton>
    </StyledFilterButtonWrapper>
  );
}