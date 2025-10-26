"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/organisms/Header";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Product, Ingredient, PriceScheme } from "@/types";
import { Card } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProductDetailPDF from "@/components/ProductDetailPDF";

export default function ProductsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil semua produk dari localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    setLoading(false);
  }, []);

  // Ambil produk berdasarkan ID jika ada
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id_product === productId);
      setProduct(foundProduct || null);
    } else {
      setProduct(null);
    }
  }, [productId, products]);

  // Fungsi untuk melihat detail produk
  const viewProductDetail = (id: string) => {
    router.push(`/products?id=${id}`);
  };

  // Fungsi untuk kembali ke daftar produk
  const backToList = () => {
    router.push("/products");
  };

  // Fungsi untuk menghapus produk
  const deleteProduct = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      const updatedProducts = products.filter(
        (product) => product.id_product !== id
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);

      // Jika menghapus produk yang sedang dilihat, kembali ke daftar
      if (productId === id) {
        router.push("/products");
      }
    }
  };

  // Jika sedang memuat data
  if (loading) {
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

  // Jika ada ID produk, tampilkan detail
  if (productId) {
    if (!product) {
      return (
        <PageTemplate>
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-4">
            <Header title="Detail Produk" />
            <div className="text-center py-12">
              <p className="text-gray-500">Produk tidak ditemukan</p>
              <Button onClick={backToList} className="mt-4">
                Kembali ke Daftar Produk
              </Button>
            </div>
          </div>
        </PageTemplate>
      );
    }

    return (
      <PageTemplate>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-4">
          <Header title={`Detail Produk ${product.product_name}`} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">HPP</h3>
              <p className="text-3xl font-bold text-indigo-600">
                Rp {product.cogm.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Harga Pokok Produksi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Harga Jual
              </h3>
              <p className="text-3xl font-bold text-green-600">
                Rp {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Tertinggi dari semua skema harga
              </p>
            </div>
          </div>

          {/* Bahan baku */}
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bahan Baku
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.ingredients.map((ingredient: Ingredient) => (
                <div
                  key={ingredient.id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-900">
                      {ingredient.name}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kebutuhan Produk:</span>
                      <span className="font-medium text-black">
                        {ingredient.requiredQuantity} {ingredient.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya:</span>
                      <span className="font-medium text-black">
                        Rp {ingredient.result.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah Pembelian:</span>
                      <span className="font-medium text-black">
                        {ingredient.purchaseQuantity} {ingredient.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Harga Pembelian:</span>
                      <span className="font-medium text-black">
                        Rp {ingredient.purchasePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skema harga */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Skema Harga
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 space-y-4">
              {product.price_scheme.map((scheme: PriceScheme) => (
                <div
                  key={scheme.id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      {scheme.name} (Level {scheme.level})
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-900">Harga Beli:</span>
                      <span className="font-medium text-black">
                        Rp {scheme.purchasePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Harga Jual:</span>
                      <span className="font-medium text-black">
                        Rp {scheme.sellingPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Keuntungan:</span>
                      <span className="font-medium text-black">
                        Rp {scheme.profit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Margin %:</span>
                      <span className="font-medium text-black">
                        {scheme.marginPercentage.toFixed(2)}%
                      </span>
                    </div>
                    {scheme.notes && (
                      <div className="mt-2">
                        <span className="text-gray-600">Catatan:</span>
                        <p className="text-sm text-gray-700">{scheme.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button
              variant="danger"
              onClick={() => deleteProduct(product.id_product)}
              className="flex-1"
            >
              Hapus
            </Button>
            <PDFDownloadLink
              document={<ProductDetailPDF product={product} />}
              fileName={`${product.product_name.replace(/\s+/g, "_")}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <Button className="flex-1" disabled>
                    Membuat PDF...
                  </Button>
                ) : (
                  <Button className="flex-1 w-full">Download PDF</Button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Jika tidak ada ID produk, tampilkan daftar produk
  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-4">
        <Header title="Semua Produk" />

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada produk yang tersimpan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id_product}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.product_name}
                  </h3>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Pokok Produksi</span>
                    <span className="font-medium text-black">
                      Rp {product.cogm.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Jual:</span>
                    <span className="font-medium text-black">
                      Rp {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => viewProductDetail(product.id_product)}
                    className="flex-1"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTemplate>
  );
}
