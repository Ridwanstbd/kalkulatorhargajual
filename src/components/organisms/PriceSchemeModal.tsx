"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "./Modal";
import { Card } from "../atoms/Card";
import { InputForm } from "../molecules/InputForm";
import { Button } from "../atoms/Button";
import { SelectForm } from "../molecules/SelectForm";
import { ProductFormData, PriceScheme } from "@/types";
import { TextAreaForm } from "../molecules/TextAreaForm";

interface PriceSchemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: ProductFormData;
  setProductData: (data: ProductFormData) => void;
}

interface NewPriceSchemeFormState {
  name: string;
  sellingPriceType: "margin" | "direct"; // Tipe harga jual: margin atau langsung
  marginPercentage: string;
  directSellingPrice: string;
  notes: string;
}

export const PriceSchemeModal = ({
  isOpen,
  onClose,
  productData,
  setProductData,
}: PriceSchemeModalProps) => {
  const [newPriceScheme, setNewPriceScheme] = useState<NewPriceSchemeFormState>(
    {
      name: "",
      sellingPriceType: "margin",
      marginPercentage: "",
      directSellingPrice: "",
      notes: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  // Hitung harga jual tertinggi saat price schemes berubah
  useEffect(() => {
    if (productData.priceSchemes.length > 0) {
      const maxPrice = Math.max(
        ...productData.priceSchemes.map((scheme) => scheme.sellingPrice)
      );

      setProductData({
        ...productData,
        price: maxPrice,
      });
    }
  }, [productData.priceSchemes]);

  // Hitung purchasePrice otomatis berdasarkan level
  const calculatePurchasePrice = (level: number): number => {
    if (level === 1) {
      // Level 1: ambil dari COGM
      return productData.cogm;
    } else {
      // Level 2+: ambil dari sellingPrice level sebelumnya
      const previousScheme = productData.priceSchemes[level - 2];
      return previousScheme ? previousScheme.sellingPrice : 0;
    }
  };

  // Hitung sellingPrice berdasarkan tipe input
  const calculateSellingPrice = (): number => {
    if (newPriceScheme.sellingPriceType === "margin") {
      // Menggunakan margin percentage
      const margin = Number(newPriceScheme.marginPercentage) || 0;
      const purchasePrice = calculatePurchasePrice(
        productData.priceSchemes.length + 1
      );
      return purchasePrice / ((100 - margin) / 100);
    } else {
      // Menggunakan harga jual langsung
      return Number(newPriceScheme.directSellingPrice) || 0;
    }
  };

  // Hitung profit otomatis
  const calculateProfit = (
    sellingPrice: number,
    purchasePrice: number
  ): number => {
    return sellingPrice - purchasePrice;
  };

  const addPriceScheme = () => {
    setErrors({});

    // Validasi
    const newErrors: Record<string, string | undefined> = {};
    if (!newPriceScheme.name) {
      newErrors.name = "Nama distribusi harus diisi";
    }
    if (
      newPriceScheme.sellingPriceType === "margin" &&
      !newPriceScheme.marginPercentage
    ) {
      newErrors.marginPercentage = "Margin harus diisi";
    }
    if (
      newPriceScheme.sellingPriceType === "direct" &&
      !newPriceScheme.directSellingPrice
    ) {
      newErrors.directSellingPrice = "Harga jual harus diisi";
    }
    if (
      newErrors.name ||
      newErrors.marginPercentage ||
      newErrors.directSellingPrice
    ) {
      setErrors(newErrors);
      return;
    }

    const level = productData.priceSchemes.length + 1;
    const purchasePrice = calculatePurchasePrice(level);
    const sellingPrice = calculateSellingPrice();
    const profit = calculateProfit(sellingPrice, purchasePrice);
    const marginPercentage =
      newPriceScheme.sellingPriceType === "margin"
        ? Number(newPriceScheme.marginPercentage)
        : sellingPrice > 0
        ? ((sellingPrice - purchasePrice) / sellingPrice) * 100
        : 0;

    const scheme: PriceScheme = {
      id: uuidv4(),
      name: newPriceScheme.name,
      level: level,
      purchasePrice: purchasePrice,
      sellingPrice: sellingPrice,
      profit: profit,
      marginPercentage: marginPercentage,
      notes: newPriceScheme.notes,
    };

    setProductData({
      ...productData,
      priceSchemes: [...productData.priceSchemes, scheme],
    });

    // Reset form
    setNewPriceScheme({
      name: "",
      sellingPriceType: "margin",
      marginPercentage: "",
      directSellingPrice: "",
      notes: "",
    });
  };

  const removePriceScheme = (id: string) => {
    setProductData({
      ...productData,
      priceSchemes: productData.priceSchemes.filter(
        (scheme) => scheme.id !== id
      ),
    });
  };

  // Update harga jual langsung saat tipe berubah
  useEffect(() => {
    if (
      newPriceScheme.sellingPriceType === "direct" &&
      newPriceScheme.marginPercentage
    ) {
      const margin = Number(newPriceScheme.marginPercentage);
      const purchasePrice = calculatePurchasePrice(
        productData.priceSchemes.length + 1
      );
      const sellingPrice = purchasePrice / ((100 - margin) / 100);
      setNewPriceScheme({
        ...newPriceScheme,
        directSellingPrice: sellingPrice.toFixed(2),
      });
    }
  }, [newPriceScheme.sellingPriceType]);

  return (
    <Modal title="Kelola Biaya Diskon" isOpen={isOpen} onClose={onClose}>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
        <div className="flex items-center">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Kelola Biaya Diskon untuk produk{" "}
              <strong>{productData.productName}</strong>. Data skema harga akan
              digunakan untuk menentukan harga jual produk.
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-black">Hasil Perhitungan</h3>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Harga Jual Tertinggi</p>
          <p className="text-2xl font-bold text-gray-900">
            Rp {productData.price.toFixed(2)}
          </p>
        </div>
      </Card>

      <Card className="mb-4">
        <h3 className="text-lg font-medium text-black mb-4">
          Tambah Skema Harga
        </h3>
        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Distribusi"
            placeholder="Nama distribusi"
            value={newPriceScheme.name}
            onChange={(e) => {
              setNewPriceScheme({ ...newPriceScheme, name: e.target.value });
            }}
            error={errors.name}
          />

          <SelectForm
            label="Tipe Harga Jual"
            value={newPriceScheme.sellingPriceType}
            onChange={(e) => {
              setNewPriceScheme({
                ...newPriceScheme,
                sellingPriceType: e.target.value as "margin" | "direct",
              });
            }}
            options={[
              { value: "margin", label: "Berdasarkan Margin %" },
              { value: "direct", label: "Input Harga Jual Langsung" },
            ]}
          />

          {newPriceScheme.sellingPriceType === "margin" && (
            <InputForm
              label="Margin %"
              type="number"
              placeholder="Margin %"
              value={newPriceScheme.marginPercentage}
              onChange={(e) =>
                setNewPriceScheme({
                  ...newPriceScheme,
                  marginPercentage: e.target.value,
                })
              }
              error={errors.marginPercentage}
            />
          )}

          {newPriceScheme.sellingPriceType === "direct" && (
            <InputForm
              label="Harga Jual"
              type="number"
              placeholder="Harga jual"
              value={newPriceScheme.directSellingPrice}
              onChange={(e) =>
                setNewPriceScheme({
                  ...newPriceScheme,
                  directSellingPrice: e.target.value,
                })
              }
              error={errors.directSellingPrice}
            />
          )}

          <TextAreaForm
            htmlFor="notes"
            label="Catatan"
            placeholder="Minimal Pembelian 100 pcs"
            value={newPriceScheme.notes}
            onChange={(e) =>
              setNewPriceScheme({ ...newPriceScheme, notes: e.target.value })
            }
            error={errors.notes}
          />
        </div>
        <Button onClick={addPriceScheme} className="w-full mt-4">
          Tambah Skema Harga
        </Button>
      </Card>
      {productData.priceSchemes.length > 0 && (
        <Card>
          <h3 className="text-lg font-medium text-black mb-4">
            Daftar Skema Harga
          </h3>
          <div className="flex flex-col gap-4">
            {productData.priceSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">
                    {scheme.name} (Level {scheme.level})
                  </h4>
                  <Button
                    variant="danger"
                    onClick={() => removePriceScheme(scheme.id)}
                    className="text-sm px-2 py-1"
                  >
                    Hapus
                  </Button>
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
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Modal>
  );
};
