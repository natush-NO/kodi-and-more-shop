import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useRouter } from "next/router";

import { StyledHeaderButton } from "./StyledHeader";

import { useCart } from "../Cart/CartContext";

export default function CartButton() {
  const router = useRouter();

  const { cartCount } = useCart();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <StyledHeaderButton
      type="button"
      onClick={handleCartClick}
      aria-label="Кошик"
    >
      <HiOutlineShoppingBag />

      {cartCount > 0 && <span>{cartCount}</span>}
    </StyledHeaderButton>
  );
}