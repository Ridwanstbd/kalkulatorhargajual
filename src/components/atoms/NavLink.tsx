import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavLink = ({
  href,
  children,
  className = "",
  onClick,
}: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${className}`}
  >
    {children}
  </Link>
);
