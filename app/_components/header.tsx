import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
const navigation = ["Motociclismo", "Ciclismo", "Corrida", "Proteção UV", "Térmicos", "Atacado"];
export function Header() { return <>
  <div className="announcement"><p>Proteção UV 50+ <span>•</span> Tecnologia para sol e frio <span>•</span> Enviamos para todo o Brasil</p></div>
  <header className="site-header" id="top"><div className="header-main container-shell">
    <a href="#top" className="logo-link" aria-label="Info Trilhas — início"><Image src="/images/logo/logo-infotrilhas.png" alt="Info Trilhas" width={666} height={374} priority /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <a href={item === "Atacado" ? "#atacado" : "#mais-vendidos"} key={item}>{item}</a>)}</nav>
    <div className="header-actions"><Link href="/admin" className="demo-access">Área da Empresa</Link><button type="button" aria-label="Buscar"><Icon name="search" size={21}/></button><button type="button" aria-label="Minha conta" className="desktop-action"><Icon name="user" size={21}/></button><button type="button" aria-label="Favoritos" className="desktop-action"><Icon name="heart" size={20}/></button><button type="button" aria-label="Carrinho" className="bag-button"><Icon name="bag" size={21}/><span>0</span></button>
      <details className="mobile-menu"><summary aria-label="Abrir menu"><Icon name="menu" size={23}/></summary><div className="mobile-panel"><div className="mobile-panel-top"><span>Menu</span><span className="close-icon"><Icon name="close" size={22}/></span></div><nav aria-label="Navegação mobile">{navigation.map(item => <a href={item === "Atacado" ? "#atacado" : "#mais-vendidos"} key={item}>{item}<Icon name="arrow" size={17}/></a>)}</nav><div className="mobile-account"><a href="#rodape"><Icon name="user" size={20}/> Minha conta</a><a href="#rodape"><Icon name="heart" size={19}/> Favoritos</a></div></div></details>
    </div></div></header>
  </>; }
