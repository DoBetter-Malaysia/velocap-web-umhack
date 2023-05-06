import Button from "@/components/buttons/Button";
import Link from "next/link";
import Logo from "../branding/Logo";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [atTopOfPage, setAtTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setAtTopOfPage(false);
    } else {
      setAtTopOfPage(true);
    }
  };

  return (
    <div
      className={`sticky left-0 right-0 top-0 z-20 flex flex-row justify-center bg-white transition-[height_width_box-shadow] ${
        atTopOfPage ? "h-[6rem]" : "h-[5rem] shadow-md"
      }`}
    >
      <nav className="flex h-full max-w-6xl flex-1 flex-row items-center justify-between">
        <Link className="h-full" href="/">
          <div className="flex h-full  items-center">
            <Logo />
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
