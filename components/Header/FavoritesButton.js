import Link from "next/link";

import { useFavorites } from "../Favorites/FavoritesContext";
import { StyledHeaderButton } from "./StyledHeader";

export default function FavoritesButton() {
  const { favorites } = useFavorites();

  const hasFavorites = favorites.length > 0;

  return (
    <Link href="/favorites" passHref legacyBehavior>
      <StyledHeaderButton
        as="a"
        aria-label="Favorites"
        $hasFavorites={hasFavorites}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </StyledHeaderButton>
    </Link>
  );
}
