import React from "react";

type SelectProps = {
  id: string;
  title: string;
  options?: string[];
  includeFirst?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectRef?: React.Ref<HTMLSelectElement>;
};

const Select: React.FC<SelectProps> = ({
  id,
  title,
  options = [],
  includeFirst = true,
  className = "",
  onChange,
  selectRef,
}) => {
  return (
    <label htmlFor={id} className="w-full flex flex-col gap-y-3 my-3">
      <span className="text-writing text-base lg:text-lg font-semibold">
        {title}
      </span>
      <select
        name={id}
        ref={selectRef}
        id={id}
        className={`select select-bordered w-full focus:outline-0 focus:border-primary ${className}`}
        onChange={onChange}
        defaultValue="none"
      >
        {includeFirst && <option value="none" disabled></option>}
        {options.map((option, i) => (
          <option key={i} value={option.split(" ").at(0)?.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
