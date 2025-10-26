import { NavItem } from "./NavItem";

interface DesktopNavMenuProps {
  items: { name: string; href: string }[];
}

export const DesktopNavMenu = ({ items }: DesktopNavMenuProps) => (
  <div className="hidden md:flex items-center space-x-8">
    {items.map((item) => (
      <NavItem key={item.name} name={item.name} href={item.href} />
    ))}
  </div>
);
