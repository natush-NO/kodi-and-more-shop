import { HiBars3 } from "react-icons/hi2";
import { StyledHeaderButton } from "./StyledHeader";

export default function MenuButton({ onClick }) {
  return (
    <StyledHeaderButton onClick={onClick}>
      <HiBars3 />
    </StyledHeaderButton>
  );
}