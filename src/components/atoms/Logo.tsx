interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => (
  <span className={`font-bold text-xl text-indigo-600 ${className}`}>
    KalkuPrice
  </span>
);
