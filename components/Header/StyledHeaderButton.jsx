export const StyledHeaderButton = styled.button`
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
  border: none;

  color: white;
  cursor: pointer;
  padding: 0;

  svg {
    width: 26px;
    height: 26px;
    stroke-width: 1.8;
  }

  &:hover {
    opacity: .8;
  }
`;