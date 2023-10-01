import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
});

interface CurrencyProps {
  value?: string | number;
}

export default function Currency({ value }: CurrencyProps) {
  return <div>{formatter.format(Number(value))}</div>;
}
