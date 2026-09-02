import type { Metadata } from "next";
import { Footer } from "../../_components/footer";
import { Header } from "../../_components/header";
import { ProductExperience } from "./product-experience";
export const metadata:Metadata={title:"Blusa Térmica Masculina Info Trilhas",description:"Blusa térmica masculina para motociclistas e aventuras no frio, com conforto, respirabilidade e fabricação própria."};
export default function ProductPage(){return <><Header/><ProductExperience/><Footer/></>}
