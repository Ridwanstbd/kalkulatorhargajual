// components/molecules/NavItem.tsx
import { NavLink } from "@/components/atoms/NavLink";

interface NavItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

export const NavItem = ({ name, href, onClick }: NavItemProps) => (
  <NavLink href={href} onClick={onClick}>
    {name}
  </NavLink>
);
