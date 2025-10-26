import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Definisikan tipe data
interface Product {
  id_product: string;
  product_name: string;
  cogm: number;
  price: number;
  ingredients: Ingredient[];
  price_scheme: PriceScheme[];
}

interface Ingredient {
  id: string;
  name: string;
  requiredQuantity: number;
  result: number;
  unit: string;
  purchaseQuantity: number;
  purchasePrice: number;
}

interface PriceScheme {
  id: string;
  name: string;
  level: number;
  purchasePrice: number;
  sellingPrice: number;
  profit: number;
  marginPercentage: number;
  notes?: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10, // Set default font size
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  header: {
    display: "flex",
    flexDirection: "row", // Gunakan flex row
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1, // Gunakan borderWidth
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  headerCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Bagi ruang
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold", // Gunakan font-family bold
  },
  // Ini adalah pengganti 'grid'
  flexGridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  // Ini adalah card untuk 'skema harga'
  schemeCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "48%", // 2 kolom
    marginBottom: 10, // Pengganti 'gap'
  },
  cardTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    fontSize: 12,
  },
  // --- Style untuk Tabel ---
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
  },
});

interface ProductDetailPDFProps {
  product: Product;
}

const ProductDetailPDF: React.FC<ProductDetailPDFProps> = ({ product }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{product.product_name}</Text>

        {/* Header: HPP dan Harga Jual */}
        <View style={styles.header}>
          <View style={styles.headerCard}>
            <Text style={styles.cardTitle}>HPP</Text>
            <Text style={styles.text}>Rp {product.cogm.toFixed(2)}</Text>
          </View>
          <View style={styles.headerCard}>
            <Text style={styles.cardTitle}>Harga Jual</Text>
            <Text style={styles.text}>Rp {product.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Bahan Baku */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bahan Baku</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCellHeader}>Nama</Text>
              <Text style={styles.tableCellHeader}>Kebutuhan</Text>
              <Text style={styles.tableCellHeader}>Biaya</Text>
              <Text style={styles.tableCellHeader}>Satuan</Text>
              <Text style={styles.tableCellHeader}>Jumlah Beli</Text>
              <Text style={styles.tableCellHeader}>Harga Beli</Text>
            </View>
            {product.ingredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{ingredient.name}</Text>
                <Text style={styles.tableCell}>
                  {ingredient.requiredQuantity}
                </Text>
                <Text style={styles.tableCell}>
                  Rp {ingredient.result.toFixed(2)}
                </Text>
                <Text style={styles.tableCell}>{ingredient.unit}</Text>
                <Text style={styles.tableCell}>
                  {ingredient.purchaseQuantity}
                </Text>
                <Text style={styles.tableCell}>
                  Rp {ingredient.purchasePrice.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skema Harga */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skema Harga</Text>
          <View style={styles.flexGridContainer}>
            {product.price_scheme.map((scheme) => (
              <View key={scheme.id} style={styles.schemeCard}>
                <Text style={styles.cardTitle}>
                  {scheme.name} (Level {scheme.level})
                </Text>
                <Text style={styles.text}>
                  Harga Beli: Rp {scheme.purchasePrice.toFixed(2)}
                </Text>
                <Text style={styles.text}>
                  Harga Jual: Rp {scheme.sellingPrice.toFixed(2)}
                </Text>
                <Text style={styles.text}>
                  Keuntungan: Rp {scheme.profit.toFixed(2)}
                </Text>
                <Text style={styles.text}>
                  Margin %: {scheme.marginPercentage.toFixed(2)}%
                </Text>
                {scheme.notes && (
                  <Text style={styles.text}>Catatan: {scheme.notes}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProductDetailPDF;
