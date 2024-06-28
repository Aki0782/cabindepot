export const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
};
// new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(3000)}
