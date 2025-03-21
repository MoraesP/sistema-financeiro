import { ButtonHTMLAttributes, ReactNode } from "react";

export type Variant = "primary" | "secondary" | "tertiary" | "disabled";

export type ButtonType = "outlined" | "regular" | "transparent";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
  buttonType: ButtonType;
  customClass?: string;
}
