import { Footer } from "../organisms/Footer";
import { Navbar } from "../organisms/Navbar";

interface PageTemplateProps {
  children: React.ReactNode;
}

export const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};
