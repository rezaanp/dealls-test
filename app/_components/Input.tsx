"use client";
import { FC, ReactNode } from "react";
//THIRD PARTY
import { FaSearch } from "react-icons/fa";
import clsx from "classnames";

//TYPES
interface InputTextProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | any;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  Icon?: ReactNode;
}

interface InputSelectProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | any;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  options: string[];
}

export const InputText: FC<InputTextProps> = ({
  onChange,
  placeholder,
  disabled,
  value,
  Icon,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        disabled={disabled}
        className={clsx(
          "border-[3px] outline-none rounded-lg px-7 h-10 w-full",
          {
            "focus:border-slate-500 border-slate-400": !disabled,
            "focus:border-slate-300 border-slate-200 cursor-not-allowed":
              disabled,
          }
        )}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {Icon && Icon}
    </div>
  );
};

export const InputSelect: FC<InputSelectProps> = ({
  onChange,
  options,
  placeholder,
  disabled,
  value,
}) => {
  return (
    <>
      <select
        name="select"
        id="select"
        disabled={disabled}
        className={clsx(
          "border-[3px] outline-none rounded-lg px-7 h-10 w-full text-slate-600",
          {
            "focus:border-slate-500 border-slate-400": !disabled,
            "focus:border-slate-300 border-slate-200 cursor-not-allowed":
              disabled,
          }
        )}
        onChange={onChange}
        value={value}
        required
      >
        <option hidden>{placeholder}</option>
        {options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
