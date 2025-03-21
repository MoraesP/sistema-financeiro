import type { Meta, StoryObj } from "@storybook/react";
import { ButtonProps } from "../components/atoms/button/button.types";
import { Button } from "../components/atoms/button/Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "disabled"],
    },
    buttonType: {
      control: "select",
      options: ["outlined", "regular", "transparent"],
    },
    children: {
      control: "text",
    },
    customClass: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    buttonType: "regular",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    buttonType: "outlined",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary Button",
    variant: "tertiary",
    buttonType: "transparent",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "disabled",
    buttonType: "regular",
    disabled: true,
  },
};
