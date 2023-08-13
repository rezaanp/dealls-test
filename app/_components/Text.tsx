import { FC, ReactNode } from "react";
import clsx from "classnames";

interface TextProps {
  type?: "body" | "subtitle" | "title";
  size?: "M" | "L" | "XL";
  className?: string;
  children: ReactNode;
}

const Text: FC<TextProps> = ({
  type = "body",
  size = "M",
  className = "",
  children,
}) => {
  return (
    <div
      className={clsx(
        {
          "font-medium": type === "body",
          "font-semibold": type === "subtitle",
          "font-bold": type === "title",
        },
        {
          "text-base": size === "M",
          "text-lg": size === "L",
          "text-xl": size === "XL",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Text;
