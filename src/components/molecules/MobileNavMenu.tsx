import { NavItem } from "./NavItem";

interface MobileNavMenuProps {
  items: { name: string; href: string }[];
  onClose: () => void;
}

export const MobileNavMenu = ({ items, onClose }: MobileNavMenuProps) => (
  <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
    {items.map((item) => (
      <NavItem
        key={item.name}
        name={item.name}
        href={item.href}
        onClick={onClose}
      />
    ))}
  </div>
);
