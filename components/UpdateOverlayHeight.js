import { useEffect } from "react";

const UpdateOverlayHeight = () => {
  useEffect(() => {
    const updateOverlayHeight = () => {
      document.documentElement.style.setProperty(
        "--body-height",
        `${document.body.scrollHeight}px`
      );
    };

    updateOverlayHeight();

    window.addEventListener("resize", updateOverlayHeight);
    window.addEventListener("scroll", updateOverlayHeight);

    return () => {
      window.removeEventListener("resize", updateOverlayHeight);
      window.removeEventListener("scroll", updateOverlayHeight);
    };
  }, []);

  return null;
};

export default UpdateOverlayHeight;
