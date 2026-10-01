import type { Metadata } from "next";
import { Footer } from "../../_components/footer";
import { Header } from "../../_components/header";
import { ProductExperience } from "../_components/product-experience";
import { product } from "../_data/product";

export const metadata: Metadata = {
  title: `${product.name} | Info Trilhas`,
  description: product.description,
  alternates: { canonical: `/produto/${product.slug}` },
};

export default function ProductPage() {
  return <><Header /><ProductExperience product={product} /><Footer /></>;
}
