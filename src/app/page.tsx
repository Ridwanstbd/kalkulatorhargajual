import { Suspense } from "react";
import { Header } from "@/components/organisms/Header";
import { PageTemplate } from "@/components/templates/PageTemplate";
import ProductsView from "../components/ProductsView";

export default function Home() {
  function LoadingFallback() {
    return (
      <PageTemplate>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-4">
          <Header title="Produk" />
          <div className="text-center py-12">
            <p className="text-gray-500">Memuat data...</p>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Suspense fallback={<LoadingFallback />}>
        <ProductsView />
      </Suspense>
    </PageTemplate>
  );
}
