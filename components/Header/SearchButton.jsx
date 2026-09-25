import { HiMagnifyingGlass } from "react-icons/hi2";

import { StyledHeaderButton } from "./StyledHeader";

export default function SearchButton({ onClick }) {
  return (
    <StyledHeaderButton
      type="button"
      onClick={onClick}
      aria-label="Пошук"
      $isSearch
    >
      <HiMagnifyingGlass />

      <span>Пошук товарів...</span>
    </StyledHeaderButton>
  );
}