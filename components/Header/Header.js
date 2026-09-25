import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import BrandMarquee from "../BrandMarquee/BrandMarquee";

export default function Header() {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
      <BrandMarquee />
    </>
  );
}
