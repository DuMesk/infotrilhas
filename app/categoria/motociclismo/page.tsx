import type { Metadata } from "next";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";
import { CategoryExperience } from "../_components/category-experience";
import { motociclismo } from "../_data/categories";

export const metadata: Metadata = {
  title: motociclismo.metadata.title,
  description: motociclismo.metadata.description,
  alternates: { canonical: `/categoria/${motociclismo.slug}` },
};

export default function MotorcycleCategoryPage() {
  return <><Header variant="category" /><CategoryExperience category={motociclismo} /><Footer /></>;
}
