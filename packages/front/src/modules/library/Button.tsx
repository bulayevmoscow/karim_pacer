import style from "./Button.module.scss";
import { FC, MouseEventHandler } from "react";

type TButton = {
  color: "green" | "blue" | "red" | "gray";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<TButton> = ({
  disabled = false,
  color = "gray",
  children,
  onClick,
}) => {
  if (!children) {
    return null;
  }

  const colorClass =
    (color === "gray" && style.button_grey) ||
    (color === "red" && style.button_red) ||
    (color === "blue" && style.button_blue) ||
    (color === "green" && style.button_green);
  return (
    <button
      className={`${style.button} ${colorClass}`}
      disabled={disabled}
      onClick={onClick ?? undefined}
    >
      {children}
    </button>
  );
};
