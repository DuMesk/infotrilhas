"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";
import { Icon } from "../../_components/icons";
import type { Category, CategoryPreviewProduct } from "../_data/categories";
import styles from "./category-experience.module.css";

const currency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function PreviewCard({ item, label }: { item: CategoryPreviewProduct; label: string }) {
  const content = <>
    <div className={styles.previewImage}><Image src={item.image.src} alt={item.image.alt} fill sizes="144px" loading="lazy" /></div>
    <div className={styles.previewInfo}>
      {item.line && <small>{item.line}</small>}
      <h3>{item.name}</h3>
      <strong>{currency(item.price)}</strong>
      {item.href && <span>{label}<Icon name="arrow" size={12} /></span>}
    </div>
  </>;
  return item.href
    ? <Link href={item.href} className={styles.previewCard}>{content}</Link>
    : <div className={styles.previewCard}>{content}</div>;
}

function CategoryBackdrop({ category }: { category: Category }) {
  const desktop = category.backgroundDesktop ?? category.backgroundMobile;
  const mobile = category.backgroundMobile ?? category.backgroundDesktop;
  if (!desktop || !mobile) return null;

  // O CSS seleciona somente o WebP correspondente ao breakpoint atual.
  const backgroundStyle = {
    "--background-desktop": `url(${JSON.stringify(desktop.src)})`,
    "--background-mobile": `url(${JSON.stringify(mobile.src)})`,
  } as CSSProperties;

  return <div className={styles.backdrop} style={backgroundStyle} aria-hidden="true" />;
}

export function CategoryExperience({ category }: { category: Category }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    // Desconta a altura real da faixa e do Header, inclusive quando o texto
    // quebra no mobile, para manter o CTA dentro da primeira dobra.
    const updateOffset = () => hero.style.setProperty("--hero-offset", `${hero.getBoundingClientRect().top + window.scrollY}px`);
    const observer = new ResizeObserver(updateOffset);
    document.querySelectorAll(".site-header, .announcement").forEach(element => observer.observe(element));
    window.addEventListener("resize", updateOffset);
    updateOffset();
    return () => { observer.disconnect(); window.removeEventListener("resize", updateOffset); };
  }, []);

  const singleProduct = category.products.length === 1;
  const imageSizes = singleProduct
    ? "(max-width: 639px) calc(100vw - 32px), 380px"
    : "(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 80px) / 2), 380px";

  return <main className={styles.page}>
    <section ref={heroRef} className={styles.hero} aria-labelledby={`${category.slug}-title`}>
      <CategoryBackdrop category={category} />
      <nav className={`container-shell ${styles.breadcrumb}`} aria-label={category.labels.breadcrumb}>
        <Link href="/"><Icon name="arrow-left" size={14} />{category.labels.backToStore}</Link>
        <span aria-hidden="true">/</span><span>{category.name}</span>
      </nav>
      <div className={`container-shell ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><Icon name={category.icon} size={22} />{category.eyebrow}</p>
          <h1 id={`${category.slug}-title`}>{category.title}</h1>
          <p className={styles.heroDescription}>{category.description}</p>
          <a href={`#${category.catalog.id}`} className={styles.primaryAction}>{category.heroCta}<Icon name="arrow" size={18} /></a>
        </div>
      </div>
      <section className={`container-shell ${styles.preview}`} aria-labelledby={`${category.slug}-preview-title`}>
        <div className={styles.previewHeading}>
          <h2 id={`${category.slug}-preview-title`}>{category.preview.title}</h2>
          <Icon name="arrow" size={16} />
        </div>
        <ul className={styles.previewTrack} tabIndex={0} aria-label={category.preview.title}>
          {category.preview.products.map(item => <li key={item.image.src}>
            <PreviewCard item={item} label={category.labels.viewProduct} />
          </li>)}
        </ul>
      </section>
    </section>

    <section id={category.catalog.id} className={styles.catalog} aria-labelledby={`${category.slug}-products-title`}>
      <div className={`container-shell ${styles.catalogLayout} ${singleProduct ? styles.singleProduct : ""}`}>
        <div className={styles.catalogHeading}>
          <p className={styles.eyebrow}>{category.catalog.eyebrow}</p>
          <h2 id={`${category.slug}-products-title`}>{category.catalog.title}</h2>
          <p className={styles.sectionDescription}>{category.catalog.description}</p>
        </div>
        <div className={styles.productsGrid}>{category.products.map(item => <article key={item.slug} className={styles.productCard}>
          <Link href={item.href} className={styles.productLink} aria-labelledby={`${category.slug}-${item.slug}-name`}>
            <div className={styles.productImage}>
              <Image src={item.image.src} alt={item.image.alt} fill sizes={imageSizes} loading="lazy" />
              <span className={styles.productBadge}>{item.line}</span>
            </div>
            <div className={styles.productInfo}>
              <p className={styles.productCondition}>{item.condition}</p>
              <h3 id={`${category.slug}-${item.slug}-name`}>{item.name}</h3>
              <div className={styles.productPrice}>
                {item.originalPrice !== undefined && <del>{category.labels.originalPrice} {currency(item.originalPrice)}</del>}
                <strong>{item.originalPrice !== undefined && <small>{category.labels.currentPrice} </small>}{currency(item.price)}</strong>
              </div>
              <span className={styles.productAction}>{category.labels.viewProduct}<Icon name="arrow" size={17} /></span>
            </div>
          </Link>
        </article>)}</div>
        {category.products.length === 0 && <p className={styles.sectionDescription}>{category.labels.emptyProducts}</p>}
      </div>
    </section>
    <section className={`container-shell ${styles.presentation}`} aria-labelledby={`${category.slug}-presentation-title`}>
      <div>
        <p className={styles.eyebrow}>{category.presentation.eyebrow}</p>
        <h2 id={`${category.slug}-presentation-title`}>{category.presentation.title}</h2>
        <p className={styles.sectionDescription}>{category.presentation.description}</p>
      </div>
      <ul className={styles.benefits}>{category.benefits.map(benefit => <li key={benefit.title}>
        <Icon name={benefit.icon} size={24} /><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
      </li>)}</ul>
    </section>

  </main>;
}
