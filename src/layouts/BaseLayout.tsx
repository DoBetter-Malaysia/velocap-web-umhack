import Footer from "@/components/footers/Footer";
import Navbar from "@/components/navbars/Navbar";
import { ReactElement, ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-100 h-full py-1 min-h-[100vh] shadow-md">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default function getDefaultLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
}
