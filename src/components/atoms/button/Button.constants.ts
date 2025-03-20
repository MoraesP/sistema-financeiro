import { ButtonType, Variant } from "./button.types";

export const variantMap: { [key in Variant]: string } = {
  primary:
    "bg-primary-400 outline-primary-400 hover:bg-primary-600 hover:outline-primary-600",
  secondary:
    "bg-secondary-400 outline-secondary-400 hover:bg-secondary-600 hover:outline-secondary-600 hover:text-white",
  tertiary:
    "bg-tertiary-400 outline-tertiary-400 hover:bg-tertiary-600 hover:bg-tertiary-600",
};

export const buttonTypeMap: { [key in ButtonType]: string } = {
  outlined: "outline outline-1 bg-transparent text-secondary-400",
  regular: "text-white",
  transparent: "bg-transparent",
};
