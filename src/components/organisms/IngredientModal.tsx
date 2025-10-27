"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ProductFormData, Ingredient } from "@/types";
import { Modal } from "./Modal";
import { Card } from "../atoms/Card";
import { InputForm } from "../molecules/InputForm";
import { Button } from "../atoms/Button";
import { SelectForm } from "../molecules/SelectForm";
import { Icon } from "../atoms/Icon";

interface IngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: ProductFormData;
  setProductData: (data: ProductFormData) => void;
}

interface NewIngredientFormState {
  name: string;
  unit: string;
  purchaseQuantity: string;
  purchasePrice: string;
  requiredQuantity: string;
}

export const IngredientModal = ({
  isOpen,
  onClose,
  productData,
  setProductData,
}: IngredientModalProps) => {
  const [newIngredient, setNewIngredient] = useState<NewIngredientFormState>({
    name: "",
    unit: "",
    purchaseQuantity: "",
    purchasePrice: "",
    requiredQuantity: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    const totalResult = productData.ingredients.reduce(
      (sum, ing) => sum + ing.result,
      0
    );

    setProductData({
      ...productData,
      cogm: totalResult,
    });
  }, [productData.ingredients]);

  const addIngredient = () => {
    setErrors({});

    // Validasi
    const newErrors: Record<string, string | undefined> = {};
    if (!newIngredient.name) {
      newErrors.name = "Nama bahan harus diisi";
    }
    if (!newIngredient.unit) {
      newErrors.unit = "Satuan harus diisi";
    }
    if (newErrors.name || newErrors.unit) {
      setErrors(newErrors);
      return;
    }

    const ingredient: Ingredient = {
      id: uuidv4(),
      name: newIngredient.name,
      unit: newIngredient.unit,
      purchaseQuantity: Number(newIngredient.purchaseQuantity) || 0,
      purchasePrice: Number(newIngredient.purchasePrice) || 0,
      requiredQuantity: Number(newIngredient.requiredQuantity) || 0,
      result:
        newIngredient.purchaseQuantity &&
        Number(newIngredient.purchaseQuantity) > 0
          ? (Number(newIngredient.purchasePrice) /
              Number(newIngredient.purchaseQuantity)) *
            Number(newIngredient.requiredQuantity)
          : 0,
    };

    setProductData({
      ...productData,
      ingredients: [...productData.ingredients, ingredient],
    });

    setNewIngredient({
      name: "",
      unit: "",
      purchaseQuantity: "",
      purchasePrice: "",
      requiredQuantity: "",
    });
    setIsFormVisible(false);
  };

  const removeIngredient = (id: string) => {
    setProductData({
      ...productData,
      ingredients: productData.ingredients.filter((ing) => ing.id !== id),
    });
  };

  const unitOptions = [
    { value: "", label: "Pilih Satuan" },
    { value: "kg", label: "kg" },
    { value: "gram", label: "gram" },
    { value: "liter", label: "liter" },
    { value: "ml", label: "ml" },
    { value: "pcs", label: "pcs" },
    { value: "box", label: "box" },
    { value: "pack", label: "pack" },
    { value: "meter", label: "meter" },
    { value: "cm", label: "cm" },
  ];

  return (
    <Modal
      title="Hitung Harga Pokok Produksi"
      isOpen={isOpen}
      onClose={onClose}
    >
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
              Kelola bahan baku untuk produk{" "}
              <strong>{productData.productName}</strong>. Data bahan akan
              digunakan untuk menghitung harga pokok produksi.
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-black">Hasil Perhitungan</h3>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Harga Pokok Produksi</p>
          <p className="text-2xl font-bold text-gray-900">
            Rp {productData.cogm.toFixed(2)}
          </p>
        </div>
      </Card>
      {productData.ingredients.length > 0 && (
        <Card>
          <h3 className="text-lg font-medium text-black mb-4">
            Daftar Bahan Baku
          </h3>
          <div className="flex flex-col gap-4">
            {productData.ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">
                    {ingredient.name}
                  </h4>
                  <Button
                    variant="danger"
                    onClick={() => removeIngredient(ingredient.id)}
                    className="text-sm px-2 py-1"
                  >
                    Hapus
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-900">Satuan:</span>
                    <span className="font-medium text-black">
                      {ingredient.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah Beli:</span>
                    <span className="font-medium text-black">
                      {ingredient.purchaseQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Beli:</span>
                    <span className="font-medium text-black">
                      Rp {ingredient.purchasePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kebutuhan:</span>
                    <span className="font-medium text-black">
                      {ingredient.requiredQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya:</span>
                    <span className="font-medium text-black">
                      Rp {ingredient.result.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {!isFormVisible ? (
        // TAMPILAN MINIMIZE (Tombol '+')
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition mb-4"
          aria-label="Tambah Bahan Baku"
        >
          <Icon name="plus" size={20} />
          <span className="ml-2 font-medium">Tambah Bahan Baku</span>
        </button>
      ) : (
        // TAMPILAN EXPANDED (Form Lengkap)
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-black">
              Tambah Bahan Baku
            </h3>
            {/* Tombol 'X' untuk minimize manual */}
            <button
              onClick={() => setIsFormVisible(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              aria-label="Tutup form"
            >
              <Icon name="x" size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <InputForm
              label="Nama Bahan"
              placeholder="Nama bahan"
              value={newIngredient.name}
              onChange={(e) => {
                setNewIngredient({ ...newIngredient, name: e.target.value });
              }}
              error={errors.name}
            />
            <SelectForm
              label="Satuan"
              ariaLabel="Unit"
              value={newIngredient.unit}
              options={unitOptions}
              onChange={(e) => {
                setNewIngredient({ ...newIngredient, unit: e.target.value });
              }}
              error={errors.unit}
            />
            <InputForm
              label="Jumlah Beli"
              type="number"
              placeholder="Jumlah beli"
              value={newIngredient.purchaseQuantity}
              onChange={(e) =>
                setNewIngredient({
                  ...newIngredient,
                  purchaseQuantity: e.target.value,
                })
              }
              error={errors.purchaseQuantity}
            />
            <InputForm
              label="Harga Beli"
              type="number"
              placeholder="Harga beli"
              value={newIngredient.purchasePrice}
              onChange={(e) =>
                setNewIngredient({
                  ...newIngredient,
                  purchasePrice: e.target.value,
                })
              }
              error={errors.purchasePrice}
            />
            <InputForm
              label="Kebutuhan Produk"
              type="number"
              placeholder="Kebutuhan"
              value={newIngredient.requiredQuantity}
              onChange={(e) =>
                setNewIngredient({
                  ...newIngredient,
                  requiredQuantity: e.target.value,
                })
              }
              error={errors.requiredQuantity}
            />
          </div>
          <Button onClick={addIngredient} className="w-full mt-4">
            Tambah Bahan
          </Button>
        </Card>
      )}
    </Modal>
  );
};
