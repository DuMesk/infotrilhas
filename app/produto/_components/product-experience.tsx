"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { Icon } from "../../_components/icons";
import type { Product } from "../_data/product";
import styles from "./product-experience.module.css";

const currency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function ProductDialog({ children, label, onClose, onNavigate, className = "" }: { children: ReactNode; label: string; onClose: () => void; onNavigate?: (delta: number) => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={ref} className={`${styles.dialog} ${className}`} aria-label={label} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (onNavigate && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); onNavigate(event.key === "ArrowLeft" ? -1 : 1); } }}>
    <button type="button" className={styles.closeDialog} aria-label="Fechar" onClick={onClose} autoFocus><Icon name="close" /></button>
    {children}
  </dialog>;
}

export function ProductExperience({ product }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [actionMessage, setActionMessage] = useState("");
  const stopped = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const [size, setSize] = useState<number | null>(null);
  const [orderPreview, setOrderPreview] = useState(false);
  const guideRef = useRef<HTMLDetailsElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const selectedSize = product.sizes.find(item => item.size === size);

  function stopAutoplay() {
    stopped.current = true;
    if (timer.current) clearInterval(timer.current);
  }
  function navigate(delta: number) {
    stopAutoplay();
    setImage(value => (value + delta + product.images.length) % product.images.length);
  }
  function startPointer(event: PointerEvent<HTMLElement>) {
    stopAutoplay();
    pointer.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function endPointer(event: PointerEvent<HTMLElement>) {
    if (!pointer.current) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    dragged.current = Math.abs(dx) > 10 || Math.abs(dy) > 10;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1);
    pointer.current = null;
  }
  useEffect(() => {
    if (stopped.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => {
      if (!document.hidden && !stopped.current) setImage(value => (value + 1) % product.images.length);
    }, 4000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [product.images.length]);

  async function shareProduct() {
    try {
      if (navigator.share) await navigator.share({ title: product.name, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setActionMessage("Link copiado!"); }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setActionMessage("Não foi possível compartilhar. Copie o endereço da página.");
    }
  }

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Mede o espaço real antes da seção, inclusive faixa, header e breadcrumb.
    // A altura mínima permite crescimento com zoom de texto e telas muito baixas.
    const updateOffset = () => {
      const offset = hero.getBoundingClientRect().top + window.scrollY;
      hero.style.setProperty("--intro-offset", `${offset}px`);
      const buybox = hero.querySelector<HTMLElement>(".product-buybox");
      if (buybox) hero.style.setProperty("--buybox-height", `${buybox.offsetHeight}px`);
    };
    const observer = new ResizeObserver(updateOffset);
    document.querySelectorAll(".site-header, .announcement, .product-breadcrumb").forEach(element => observer.observe(element));
    const buybox = hero.querySelector(".product-buybox");
    if (buybox) observer.observe(buybox);
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
          <button type="button" className={`product-main-image ${styles.zoomImage}`} id="product-gallery-image" aria-label="Ampliar imagem do produto" aria-haspopup="dialog" onPointerDown={startPointer} onPointerUp={endPointer} onPointerCancel={() => { pointer.current = null; dragged.current = true; }} onClick={() => { stopAutoplay(); if (!dragged.current) setLightbox(true); dragged.current = false; }}>
            <Image key={product.images[image].src} className={styles.slideImage} src={product.images[image].src} alt={product.images[image].alt} fill preload={image === 0} sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 899px) calc(100vw - 56px), (max-width: 1296px) 55vw, 690px" draggable={false} />
            <span className={styles.zoomHint}><Icon name="search" size={15} />Ampliar imagem</span>
          </button>
          <div className={styles.galleryCaption} aria-live="polite">
            <span>{product.images[image].label}</span>
            <span>{image + 1} / {product.images.length}</span>
          </div>
          <div className="product-thumbs" role="group" aria-label="Imagens do produto">
            {product.images.map((item, index) => (
              <button type="button" className={image === index ? "active" : ""} onClick={() => { stopAutoplay(); setImage(index); }} key={item.src} aria-label={`Ver imagem ${index + 1}: ${item.label}`} aria-pressed={image === index} aria-controls="product-gallery-image">
                <Image src={item.src} alt="" fill sizes="(max-width: 899px) 44px, 64px" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-buybox">
          <p className="product-kicker"><span>{product.line}</span><span>{product.condition}</span></p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-positioning">{product.description}</p>
          <div className="product-price">{product.originalPrice !== undefined && <del className={styles.originalPrice}>DE {currency(product.originalPrice)}</del>}<strong>{currency(product.price)}</strong></div>
          <div className={styles.actions}>
            <button type="button" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${product.name} ${window.location.href}`)}`, "_blank", "noopener,noreferrer")}><Icon name="message" size={16} />WhatsApp</button>
            <button type="button" onClick={shareProduct}><Icon name="arrow" size={16} />Compartilhar</button>
            <button type="button" onClick={() => setActionMessage("A sacola estará disponível em breve.")}><Icon name="bag" size={16} />Sacola</button>
          </div>
          {actionMessage && <p role="status" className={styles.actionMessage}>{actionMessage}</p>}
          <p className={styles.orderStatus}><span />{product.status} · {product.origin}</p>

          <div className={styles.orderArea}>
            <button type="button" className="button button-gold" aria-haspopup="dialog" onClick={() => { setOrderPreview(false); setOrdering(true); }}>FAZER PEDIDO <Icon name="arrow" size={18} /></button>
          </div>
        </div>
      </section>

      {ordering && <ProductDialog label="Escolha seu tamanho" onClose={() => setOrdering(false)}>
        <h2>Escolha seu tamanho</h2>
        <form onSubmit={event => { event.preventDefault(); setOrderPreview(true); }}>
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
            <label className={styles.quantity}>Quantidade<input type="number" min="1" step="1" required value={quantity} onChange={event => { setQuantity(Number(event.target.value)); setOrderPreview(false); }} /></label>
            <button type="submit" className="button button-gold" disabled={size === null}>Continuar <Icon name="arrow" size={18} /></button>
          </div>
          <p className={styles.demoNote}>Demonstração · nenhum pedido será enviado.</p>
          {orderPreview && <p role="status" className={styles.orderFeedback}>Tamanho {selectedSize?.size} ({selectedSize?.equivalent}) · Quantidade: {quantity}. Seleção demonstrativa. Nenhum pedido foi enviado.</p>}
        </form>
      </ProductDialog>}

      {lightbox && <ProductDialog label="Galeria ampliada do produto" onClose={() => setLightbox(false)} onNavigate={navigate} className={styles.lightbox}>
        <div className={styles.lightboxImage} onPointerDown={startPointer} onPointerUp={endPointer} onPointerCancel={() => { pointer.current = null; }}>
          <Image key={product.images[image].src} src={product.images[image].src} alt={product.images[image].alt} fill sizes="100vw" draggable={false} />
        </div>
        <div className={styles.lightboxNavigation}><button type="button" aria-label="Imagem anterior" onClick={() => navigate(-1)}>←</button><p aria-live="polite">{product.images[image].label} · {image + 1} / {product.images.length}</p><button type="button" aria-label="Próxima imagem" onClick={() => navigate(1)}>→</button></div>
      </ProductDialog>}

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
