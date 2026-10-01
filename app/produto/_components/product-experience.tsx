"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../../_components/icons";
import type { Product } from "../_data/product";
import styles from "./product-experience.module.css";

const currency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ProductExperience({ product }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [size, setSize] = useState<number | null>(null);
  const [orderPreview, setOrderPreview] = useState(false);
  const guideRef = useRef<HTMLDetailsElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const selectedSize = product.sizes.find(item => item.size === size);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Mede o espaço real antes da seção, inclusive faixa, header e breadcrumb.
    // A altura mínima permite crescimento com zoom de texto e telas muito baixas.
    const updateOffset = () => {
      const offset = hero.getBoundingClientRect().top + window.scrollY;
      hero.style.setProperty("--intro-offset", `${offset}px`);
    };
    const observer = new ResizeObserver(updateOffset);
    document.querySelectorAll(".site-header, .announcement, .product-breadcrumb").forEach(element => observer.observe(element));
    window.addEventListener("resize", updateOffset);
    updateOffset();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  function openGuide() {
    if (!guideRef.current) return;
    guideRef.current.open = true;
    guideRef.current.querySelector("summary")?.focus({ preventScroll: true });
    guideRef.current.scrollIntoView({ block: "start" });
  }

  return (
    <main className={`product-page ${styles.page}`}>
      <div className="container-shell product-breadcrumb">
        <Link href="/">← Voltar para a loja</Link>
        <span>{product.line}</span>
      </div>

      <section ref={heroRef} className="container-shell product-hero" aria-labelledby="product-title">
        <div className="product-gallery">
          <button type="button" className={`product-main-image ${styles.zoomImage} ${zoomed ? styles.zoomed : ""}`} id="product-gallery-image" aria-label={zoomed ? "Reduzir imagem do produto" : "Ampliar imagem do produto"} aria-pressed={zoomed} onClick={() => setZoomed(value => !value)} onKeyDown={event => { if (event.key === "Escape") setZoomed(false); }}>
            <Image src={product.images[image].src} alt={product.images[image].alt} fill priority sizes="(max-width: 899px) 94vw, 50vw" />
            <span className={styles.zoomHint}><Icon name="search" size={15} />{zoomed ? "Toque para reduzir" : "Ampliar imagem"}</span>
          </button>
          <div className={styles.galleryCaption} aria-live="polite">
            <span>{product.images[image].label}</span>
            <span>{image + 1} / {product.images.length}</span>
          </div>
          <div className="product-thumbs" role="group" aria-label="Imagens do produto">
            {product.images.map((item, index) => (
              <button type="button" className={image === index ? "active" : ""} onClick={() => { setImage(index); setZoomed(false); }} key={item.src} aria-label={`Ver imagem ${index + 1}: ${item.label}`} aria-pressed={image === index} aria-controls="product-gallery-image">
                <Image src={item.src} alt="" fill sizes="76px" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-buybox">
          <p className="product-kicker"><span>{product.line}</span><span>{product.condition}</span></p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-positioning">{product.description}</p>
          <div className="product-price"><strong>{currency(product.price)}</strong></div>
          <p className={styles.orderStatus}><span />{product.status} · {product.origin}</p>

          <fieldset className={styles.sizeOptions}>
            <legend>Tamanho adulto</legend>
            <p className={styles.sizeHint}>{product.audience} · Escolha seu tamanho.</p>
            <div className={styles.sizeGrid}>
              {product.sizes.map(item => (
                <label key={item.size}>
                  <input type="radio" name="product-size" value={item.size} checked={size === item.size} onChange={() => { setSize(item.size); setOrderPreview(false); }} />
                  <span><strong>{item.size}</strong><small>({item.equivalent})</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className={styles.orderArea}>
            {/* CTA exclusivamente demonstrativo: não envia nem registra pedidos. */}
            <button type="button" className="button button-gold" aria-describedby="order-demo-note" onClick={() => setOrderPreview(true)}>Fazer pedido <Icon name="arrow" size={18} /></button>
          </div>
        </div>
      </section>

      <div className={`container-shell ${styles.afterHero}`}>
        <button className={`guide-link ${styles.guideLink}`} type="button" onClick={openGuide}>Ver tabela de medidas <Icon name="arrow" size={15} /></button>
        <div>
          <p className={styles.shippingLine}><Icon name="truck" size={17} />{product.shipping}</p>
          <p id="order-demo-note" className={styles.demoNote}>Demonstração · pedidos ainda não disponíveis pelo site.</p>
        </div>
        {orderPreview && <p role="status" className={styles.orderFeedback}>{selectedSize ? `Tamanho ${selectedSize.size} (${selectedSize.equivalent}) selecionado. ` : ""}Esta é uma demonstração. Nenhum pedido foi enviado.</p>}
      </div>

      <section className="product-tech" aria-labelledby="product-tech-title">
        <div className="container-shell">
          <p className="eyebrow light"><span />Tecnologia Info Trilhas</p>
          <h2 id="product-tech-title">Conforto e proteção</h2>
          <div className="product-tech-grid">
            {product.features.map(item => <article key={item.title}><Icon name={item.icon} size={28} /><h3>{item.title}</h3></article>)}
          </div>
        </div>
      </section>

      <section className={`container-shell ${styles.contentSection}`} aria-labelledby="product-description-title">
        <p className="eyebrow"><span />Sobre a peça</p>
        <h2 id="product-description-title">Descrição do produto</h2>
        <p className={styles.description}>{product.description}</p>
        <dl className={styles.facts}>
          <div><dt>Linha</dt><dd>{product.line}</dd></div>
          <div><dt>Condição</dt><dd>{product.condition}</dd></div>
          <div><dt>Modelagem</dt><dd>{product.audience}</dd></div>
          <div><dt>Origem</dt><dd>{product.origin}</dd></div>
        </dl>
      </section>

      <section className={`container-shell ${styles.measurements}`} aria-label="Medidas da blusa">
        <details ref={guideRef} id="tabela-de-medidas">
          <summary><span>Tabela de medidas <small>Adulto · Unissex · cm</small></span><span className={styles.expandIcon} aria-hidden="true">+</span></summary>
          <div className={styles.guideContent}>
            <div className={styles.tableScroll} role="region" aria-label="Tabela adulta de medidas em centímetros" tabIndex={0}>
              <table>
                <caption>Medidas da blusa em centímetros</caption>
                <thead><tr><th scope="col">Tamanho</th>{product.measurementLegend.map(item => <th scope="col" key={item.key}><abbr title={item.label}>{item.key}</abbr></th>)}</tr></thead>
                <tbody>{product.sizes.map(item => <tr key={item.size} className={size === item.size ? styles.selectedRow : undefined}><th scope="row">{item.size} <span>({item.equivalent})</span></th>{item.measurements.map((value, index) => <td key={product.measurementLegend[index].key}>{value}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <dl className={styles.legend}>{product.measurementLegend.map(item => <div key={item.key}><dt>{item.key}</dt><dd>{item.label}</dd></div>)}</dl>
            <div className={styles.measurementNotes}>{product.measurementNotes.map(note => <p key={note}>{note}</p>)}</div>
          </div>
        </details>
      </section>

      <section className={`container-shell ${styles.shippingSection}`} aria-labelledby="product-shipping-title">
        <Icon name="truck" size={34} />
        <div><p className="eyebrow"><span />Pedido e envio</p><h2 id="product-shipping-title">{product.status}</h2><p>{product.shipping}</p><span>{product.origin}</span></div>
      </section>

      <section className={styles.relatedSection} aria-labelledby="related-title">
        <div className="container-shell">
          <div className={styles.relatedHeading}><div><p className="eyebrow"><span />Explore a coleção</p><h2 id="related-title">Produtos relacionados</h2></div><Link href="/#mais-vendidos">Ver na loja <Icon name="arrow" size={18} /></Link></div>
          <div className={styles.relatedGrid}>{product.related.map(item => <article className="product-card" key={item.name}><div className="product-image-wrap"><Image className="product-image" src={item.image} alt={item.name} fill sizes="(max-width: 639px) 92vw, 32vw" /></div><div className="product-info"><h3>{item.name}</h3><p className="price">{currency(item.price)}</p></div></article>)}</div>
        </div>
      </section>
    </main>
  );
}
