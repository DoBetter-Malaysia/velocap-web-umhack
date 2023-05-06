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
      className={`sticky left-0 right-0 top-0 z-20 flex flex-row justify-center bg-white transition-shadow ${
        atTopOfPage ? "" : "shadow-md"
      }`}
    >
      <nav className="flex max-w-6xl flex-1 flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Logo size={atTopOfPage ? 96 : 64} />
          </div>
        </Link>
        <div>
          <Button className="py-4">My Favorite</Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
