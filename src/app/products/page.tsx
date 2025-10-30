"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Button } from "@/components/atoms/Button";
import { IngredientModal } from "@/components/organisms/IngredientModal";
import { PriceSchemeModal } from "@/components/organisms/PriceSchemeModal";
import { ProductFormData, Product } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/atoms/Input";
import { Header } from "@/components/organisms/Header";

export default function ProductsPage() {
  const router = useRouter();
  const [productData, setProductData] = useState<ProductFormData>({
    productName: "",
    ingredients: [],
    priceSchemes: [],
    cogm: 0,
    price: 0,
  });

  // State untuk kontrol modal
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isPriceSchemeModalOpen, setIsPriceSchemeModalOpen] = useState(false);

  // Simpan produk ke localStorage
  const saveProduct = () => {
    if (
      !productData.productName ||
      productData.ingredients.length === 0 ||
      productData.priceSchemes.length === 0
    ) {
      alert("Mohon lengkapi semua data");
      return;
    }

    const product: Product = {
      id_product: uuidv4(),
      product_name: productData.productName,
      cogm: productData.cogm,
      ingredients: productData.ingredients,
      price: productData.price,
      price_scheme: productData.priceSchemes,
    };

    // Simpan ke localStorage
    const existingProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    existingProducts.push(product);
    localStorage.setItem("products", JSON.stringify(existingProducts));

    // Reset form
    setProductData({
      productName: "",
      ingredients: [],
      priceSchemes: [],
      cogm: 0,
      price: 0,
    });

    router.push(`/?id=${product.id_product}`);
  };

  // Reset data produk
  const resetProduct = () => {
    setProductData({
      productName: "",
      ingredients: [],
      priceSchemes: [],
      cogm: 0,
      price: 0,
    });
  };

  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-4">
        <Header title="Hitung Harga Jual" />

        {/* Input Nama Produk */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Nama Produk
          </label>
          <Input
            type="text"
            value={productData.productName}
            onChange={(e) =>
              setProductData({ ...productData, productName: e.target.value })
            }
            placeholder="Masukkan nama produk"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Tombol-tombol Modal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => setIsIngredientModalOpen(true)}
            disabled={!productData.productName}
          >
            Hitung Harga Pokok Produksi
          </Button>
          <Button
            onClick={() => setIsPriceSchemeModalOpen(true)}
            disabled={!productData.productName}
          >
            Hitung Biaya Diskon
          </Button>
        </div>

        {/* Hasil Perhitungan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">HPP</h3>
            <p className="text-3xl font-bold text-indigo-600">
              Rp {productData.cogm.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Harga Pokok Produksi</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Harga Jual
            </h3>
            <p className="text-3xl font-bold text-green-600">
              Rp {productData.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Tertinggi dari semua price scheme
            </p>
          </div>
        </div>

        {/* Tombol Simpan dan Reset */}
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={resetProduct}>
            Reset
          </Button>
          <Button
            onClick={saveProduct}
            disabled={
              !productData.productName ||
              productData.ingredients.length === 0 ||
              productData.priceSchemes.length === 0
            }
          >
            Simpan Produk
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-md text-gray-700 italic">
            *Data yang Anda masukkan hanya disimpan secara lokal di perangkat
            Anda dan tidak dikirim ke server mana pun.
          </p>
        </div>
      </div>

      {/* Modal Ingredients */}
      <IngredientModal
        isOpen={isIngredientModalOpen}
        onClose={() => setIsIngredientModalOpen(false)}
        productData={productData}
        setProductData={setProductData}
      />

      {/* Modal Price Scheme */}
      <PriceSchemeModal
        isOpen={isPriceSchemeModalOpen}
        onClose={() => setIsPriceSchemeModalOpen(false)}
        productData={productData}
        setProductData={setProductData}
      />
    </PageTemplate>
  );
}
