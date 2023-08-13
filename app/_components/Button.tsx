"use client";
import React, { FC } from "react";
import clsx from "classnames";

interface ButtonProps {
  onClick?: React.MouseEventHandler | any;
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: "contained" | "outlined";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant,
  className,
}) => {
  return (
    <div
      onClick={!disabled ? onClick : () => {}}
      className={clsx(
        "flex items-center justify-center px-3 h-8 rounded-md border-2",
        className,
        {
          "cursor-not-allowed bg-slate-400 border-slate-400 text-white":
            variant === "contained" && disabled,
          "cursor-pointer bg-slate-600 hover:bg-slate-500 border-slate-800 text-white":
            variant === "contained" && !disabled,
          "cursor-pointer hover:bg-slate-300 border-slate-500 text-slate-border-slate-500":
            variant === "outlined" && !disabled,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Button;
