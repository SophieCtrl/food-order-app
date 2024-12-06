import React from "react";

export default function CurrencyFormatter({ value }) {
  const formattedValue = new Intl.NumberFormat("de-De", {
    style: "currency",
    currency: "EUR",
  }).format(value);

  return <span>{formattedValue}</span>;
}
