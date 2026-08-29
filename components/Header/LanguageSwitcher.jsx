import { useRouter } from "next/router";
import styled from "styled-components";

const StyledLanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 0 0 24px;

  button {
    background: transparent;
    border: none;
    color: #111;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  button.active {
    color: #000;
    text-decoration: underline;
  }

  span {
    color: #999;
  }
`;

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
  };

  return (
    <StyledLanguageSwitcher>
      <button
        className={router.locale === "uk" ? "active" : ""}
        onClick={() => changeLanguage("uk")}
      >
        UA
      </button>

      <span>|</span>

      <button
        className={router.locale === "en" ? "active" : ""}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
    </StyledLanguageSwitcher>
  );
}