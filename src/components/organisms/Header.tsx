interface HeaderProps {
  title: string;
}
export const Header = ({ title }: HeaderProps) => {
  return <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>;
};
