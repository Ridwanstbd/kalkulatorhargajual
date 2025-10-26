// Hapus "use client" dari file ini jika ada

import { Suspense } from "react";
import ProductsView from "./ProductsView";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Header } from "@/components/organisms/Header";

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

// Komponen Halaman (Page) sekarang sangat sederhana
export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductsView />
    </Suspense>
  );
}
