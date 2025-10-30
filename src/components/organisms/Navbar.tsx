"use client";

import { useState } from "react";
import { Logo } from "../atoms/Logo";
import { HamburgerButton } from "../atoms/HamburgerButton";
import { CloseButton } from "../atoms/CloseButton";
import { DesktopNavMenu } from "../molecules/DesktopNavMenu";
import { MobileNavMenu } from "../molecules/MobileNavMenu";

const navItems = [
  { name: "Semua Produk", href: "/" },
  { name: "Hitung Harga", href: "/create-product" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <DesktopNavMenu items={navItems} />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {isOpen ? (
              <CloseButton onClick={() => setIsOpen(false)} />
            ) : (
              <HamburgerButton
                isOpen={isOpen}
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <MobileNavMenu items={navItems} onClose={() => setIsOpen(false)} />
      )}
    </nav>
  );
};
