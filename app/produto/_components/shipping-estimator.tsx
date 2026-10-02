"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "../../_components/icons";
import styles from "./shipping-estimator.module.css";

export type ShippingOption = {
  id: string;
  carrier: string;
  deliveryTime: string;
  price: number;
};

// As opções serão fornecidas pela integração futura; nenhuma cotação é criada aqui.
export function ShippingEstimator({ shippingInfo, options = [] }: { shippingInfo: string; options?: readonly ShippingOption[] }) {
  const id = useId();
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8 || /^(\d)\1{7}$/.test(digits)) {
      setError("Confira seu CEP: digite 8 números no formato 00000-000.");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return <section className={styles.estimator} aria-labelledby={`${id}-title`}>
    <div className={styles.heading}><Icon name="truck" size={22} /><div><h2 id={`${id}-title`}>Envio</h2><p id={`${id}-shipping`}>{shippingInfo}</p></div></div>
    <form onSubmit={submit} noValidate>
      <label htmlFor={`${id}-cep`}>Digite seu CEP</label>
      <div className={styles.controls}>
        <input id={`${id}-cep`} name="cep" type="text" inputMode="numeric" autoComplete="shipping postal-code" placeholder="00000-000" maxLength={9} value={cep} aria-invalid={!!error} aria-describedby={`${id}-shipping${error ? ` ${id}-error` : ""}`} onChange={event => {
          const digits = event.target.value.replace(/\D/g, "").slice(0, 8);
          setCep(digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits);
          setError("");
          setSubmitted(false);
        }} />
        <button type="submit">Calcular frete <Icon name="arrow" size={15} /></button>
      </div>
      {error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}
    </form>
    <div className={styles.results} role="status" aria-live="polite" aria-label="Resultado do frete">
      {submitted && (options.length > 0 ? <ul>{options.map(option => <li key={option.id}><Icon name="truck" size={20} /><div><strong>{option.carrier}</strong><span>{option.deliveryTime}</span></div><b>{option.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b></li>)}</ul> : <p>Formato do CEP conferido. A cotação de frete estará disponível em breve.</p>)}
    </div>
  </section>;
}
