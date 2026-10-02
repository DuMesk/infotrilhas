import type { IconName } from "../../_components/icons";
import { product } from "../../produto/_data/product";

export type CategoryBackground = {
  src: string;
  width: number;
  height: number;
};

export type CategoryProduct = {
  slug: string;
  href: string;
  name: string;
  line: string;
  condition: string;
  price: number;
  originalPrice?: number;
  image: { src: string; alt: string };
};

export type CategoryPreviewProduct = Pick<CategoryProduct, "name" | "price" | "image"> & {
  href?: string;
  line?: string;
};

export type Category = {
  name: string;
  slug: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  description: string;
  signature: string;
  backgroundDesktop: CategoryBackground | null;
  backgroundMobile: CategoryBackground | null;
  heroCta: string;
  presentation: { eyebrow: string; title: string; description: string };
  benefits: { icon: IconName; title: string; description: string }[];
  catalog: { id: string; eyebrow: string; title: string; description: string };
  products: CategoryProduct[];
  preview: { title: string; products: CategoryPreviewProduct[] };
  labels: {
    breadcrumb: string;
    backToStore: string;
    viewProduct: string;
    originalPrice: string;
    currentPrice: string;
    emptyProducts: string;
  };
  metadata: { title: string; description: string };
};

const thermalProduct: CategoryProduct = {
  slug: product.slug,
  href: `/produto/${product.slug}`,
  name: product.name,
  line: product.line,
  condition: product.condition,
  price: product.price,
  originalPrice: product.originalPrice,
  image: { src: product.images[0].src, alt: product.images[0].alt },
};

// Textos editoriais provisórios para aprovação do modelo visual da categoria.
// Características e benefícios reaproveitam somente informações já presentes no site.
export const motociclismo: Category = {
  name: "Motociclismo",
  slug: "motociclismo",
  icon: "helmet",
  eyebrow: "Motociclismo",
  title: "Conforto para seguir viagem.",
  description: "Vestuário térmico e de proteção para acompanhar sua aventura na estrada.",
  signature: "Vestuário Tecnológico Brasileiro",
  backgroundDesktop: {
    src: "/images/categories/motociclismo/motociclismo-desktop.webp",
    width: 1672,
    height: 941,
  },
  backgroundMobile: {
    src: "/images/categories/motociclismo/motociclismo-mobile.webp",
    width: 941,
    height: 1672,
  },
  heroCta: "Ver produtos",
  presentation: {
    eyebrow: "Tecnologia Info Trilhas",
    title: "Conforto e proteção na estrada.",
    description: "Conforto térmico, proteção solar e respirabilidade para as suas atividades ao ar livre. Conheça o vestuário tecnológico Info Trilhas.",
  },
  benefits: [
    { icon: "temperature", title: "Conforto térmico", description: "Equilíbrio de temperatura em diferentes condições." },
    { icon: "sun", title: "Proteção UV 50+", description: "Barreira para exposição prolongada ao sol." },
    { icon: "wind", title: "Respirabilidade", description: "Tecido inteligente que favorece a troca de calor." },
  ],
  catalog: {
    id: "produtos",
    eyebrow: "Motociclismo",
    title: "Produtos para acompanhar sua aventura",
    description: "Conheça a blusa térmica da linha Thermo Comfort, para frio intermediário.",
  },
  // Seleção inicial centralizada para revisão. A galeria existente mostra esta
  // peça em uso no motociclismo; é o único produto com uma página própria real.
  products: [thermalProduct],
  preview: {
    title: "Produtos para sua aventura",
    // Segunda pele e calça complementam a blusa. Ainda sem páginas próprias.
    products: [thermalProduct, ...product.related
      .filter((_, index) => index === 0 || index === 2)
      .map(item => ({ name: item.name, price: item.price, image: { src: item.image, alt: item.name } }))],
  },
  labels: {
    breadcrumb: "Navegação da categoria",
    backToStore: "Loja",
    viewProduct: "Ver produto",
    originalPrice: "De",
    currentPrice: "Por",
    emptyProducts: "Produtos disponíveis em breve.",
  },
  metadata: {
    title: "Motociclismo | Info Trilhas",
    description: "Conheça o vestuário térmico e de proteção Info Trilhas para sua aventura na estrada.",
  },
};
