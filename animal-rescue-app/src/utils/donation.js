export const donationTableColumns = [
  {
    id: "type",
    label: "Type",
    styles: { minWidth: 100 },
    format: getTypeLabel,
  },
  {
    id: "value",
    label: "Value",
    align: "right",
    styles: { minWidth: 100 },
    format: formatCurrency,
  },
  {
    id: "description",
    label: "Description",
    styles: { minWidth: 250 },
  },
  {
    id: "user",
    label: "Created by",
    styles: { minWidth: 200 },
    format: getCreatedBy,
  },
  {
    id: "actions",
    label: "Actions",
    align: "center",
    styles: { minWidth: 250 },
  },
];

function getCreatedBy(user) {
  switch (user) {
    case undefined:
      return "Unknown";
    default:
      return user.email;
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "food":
      return "Food";
    case "toys":
      return "Toys";
    case "vet-costs":
      return "Vet Costs";
    case "medicines":
      return "Medicines";
    default:
      return `Other`;
  }
}

function formatCurrency(value) {
  return `${value} $`;
}

export const supportedTypes = [
  { value: "money", label: "Money" },
  { value: "food", label: "Food" },
  { value: "vet-costs", label: "Vet Costs" },
  { value: "medicines", label: "Medicines" },
];
