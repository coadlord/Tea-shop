import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import PageTransition from "./PageTransition";
import ChaiBot from "./ChaiBot";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ChaiBot />
    </div>
  );
};

export default Layout;
