export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  purchaseQuantity: number;
  purchasePrice: number;
  requiredQuantity: number;
  result: number;
}

export interface PriceScheme {
  id: string;
  name: string;
  level: number;
  purchasePrice: number;
  sellingPrice: number;
  profit: number;
  marginPercentage: number;
  notes?: string;
}

export interface Product {
  id_product: string;
  product_name: string;
  cogm: number;
  ingredients: Ingredient[];
  price: number;
  price_scheme: PriceScheme[];
}

export interface ProductFormData {
  productName: string;
  ingredients: Ingredient[];
  priceSchemes: PriceScheme[];
  cogm: number;
  price: number;
}
