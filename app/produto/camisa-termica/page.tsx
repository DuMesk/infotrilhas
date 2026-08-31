import type { Metadata } from "next";
import { Footer } from "../../_components/footer";
import { Header } from "../../_components/header";
import { ProductExperience } from "./product-experience";

export const metadata: Metadata = { title: "Camisa Térmica Info Trilhas | Demonstração", description: "Demonstração comercial da Camisa Térmica Info Trilhas." };
export default function ProductPage() { return <><Header /><ProductExperience /><Footer /></>; }
