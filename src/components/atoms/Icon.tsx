import React from "react";
import {
  Plus,
  Home,
  User,
  Settings,
  Search,
  Heart,
  Star,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

type LucideIcon = React.ComponentType<{
  size: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}>;

const iconRegistry: Record<string, LucideIcon> = {
  plus: Plus,
  home: Home,
  user: User,
  settings: Settings,
  search: Search,
  heart: Heart,
  star: Star,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
};

interface IconProps {
  name: string;
  size: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Icon = ({
  name,
  size,
  className,
  color,
  style,
  onClick,
}: IconProps) => {
  const IconComponent = iconRegistry[name.toLowerCase()];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found in registry`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
      style={style}
      onClick={onClick}
    />
  );
};
