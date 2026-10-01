import type { IconName } from "../../_components/icons";

export type Product = {
  slug: string;
  name: string;
  line: string;
  condition: string;
  audience: string;
  description: string;
  price: number;
  status: string;
  origin: string;
  shipping: string;
  images: { src: string; alt: string; label: string }[];
  sizes: { size: number; equivalent: string; measurements: number[] }[];
  measurementLegend: { key: string; label: string }[];
  measurementNotes: string[];
  features: { title: string; icon: IconName }[];
  related: { name: string; image: string; price: number }[];
};

// Conteúdo estático do protótipo. A página fornece estes dados ao componente
// de apresentação; futuramente, a origem pode ser substituída por um catálogo.
export const product: Product = {
  slug: "blusa-termica-masculina",
  name: "Blusa Térmica Masculina",
  line: "Thermo Comfort",
  condition: "Frio Intermediário",
  audience: "Adulto · Unissex",
  description: "Vestuário térmico e de proteção para todas as temperaturas.",
  price: 129.9,
  status: "Faça o seu pedido",
  origin: "Produto Nacional",
  shipping: "Envio pelos Correios em até 7 dias úteis.",
  // Assets existentes sem textos promocionais antigos incorporados à imagem.
  images: [
    { src: "/images/products/camisa-termica-preta.png", alt: "Blusa térmica preta Info Trilhas em cenário de montanhas", label: "Produto" },
    { src: "/images/products/camisa-termica-preta-cutout.png", alt: "Blusa térmica preta Info Trilhas em fundo escuro", label: "Peça em destaque" },
  ],
  sizes: [
    { size: 34, equivalent: "PP FEM", measurements: [41, 40, 49, 61, 65] },
    { size: 36, equivalent: "P FEM", measurements: [43, 42, 51, 65, 69] },
    { size: 38, equivalent: "M FEM", measurements: [45, 44, 53, 67, 71] },
    { size: 40, equivalent: "G FEM", measurements: [47, 45, 55, 69, 73] },
    { size: 42, equivalent: "P MASC", measurements: [49, 46, 56, 71, 75] },
    { size: 44, equivalent: "M MASC", measurements: [50, 47, 58, 73, 77] },
    { size: 46, equivalent: "G MASC", measurements: [54, 50, 61, 76, 80] },
    { size: 48, equivalent: "GG MASC", measurements: [56, 53, 63, 78, 82] },
    { size: 50, equivalent: "EXG MASC", measurements: [59, 56, 67, 81, 85] },
  ],
  measurementLegend: [
    { key: "A", label: "Largura Tórax" },
    { key: "B", label: "Largura Barra" },
    { key: "C", label: "Comprimento Frente" },
    { key: "D", label: "Comprimento Costas" },
    { key: "E", label: "Comprimento Gola-Punho" },
  ],
  measurementNotes: [
    "Variação tolerada de aproximadamente 1 cm nas medidas.",
    "Para uso como segunda pele considerar tolerância de até 5 cm em função da elasticidade do tecido.",
  ],
  features: [
    { title: "Proteção solar UVA/UVB 50+", icon: "sun" },
    { title: "Retenção de calor corporal", icon: "temperature" },
    { title: "Rápida absorção de suor", icon: "wind" },
    { title: "Tratamento anti odor", icon: "spark" },
  ],
  // Produtos e preços já presentes na Home; ainda sem páginas próprias.
  related: [
    { name: "Segunda Pele UV 50+", image: "/images/products/segunda-pele-uv.png", price: 119.9 },
    { name: "Manguito UV 50+", image: "/images/products/manguito-uv.png", price: 59.9 },
    { name: "Calça Térmica", image: "/images/products/calca-termica.png", price: 139.9 },
  ],
};
