export const formatDate = (timestamp) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(timestamp));
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatToIndianCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2, // Ensures two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  }).format(value);
}
