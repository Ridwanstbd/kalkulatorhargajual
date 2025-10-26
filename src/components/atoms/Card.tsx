interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
};
