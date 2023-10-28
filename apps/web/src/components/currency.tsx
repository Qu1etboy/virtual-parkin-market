import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
});

interface CurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | number;
}

export default function Currency({ value, ...props }: CurrencyProps) {
  return <div {...props}>{formatter.format(Number(value))}</div>;
}
