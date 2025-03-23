import React from "react";

type FormInputProps = {
  id: string;
  name?: string;
  title: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  texts?: string[];
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  title,
  type = "text",
  placeholder,
  required = true,
  defaultValue,
  disabled = false,
  texts = [],
}) => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-y-1.5 my-3">
      <label
        className="font-semibold text-base lg:text-lg text-writing"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        name={name || id}
        placeholder={placeholder}
        className={`border-b border-gray-400 focus:border-primary focus:outline-none shadow-sm caret-primary ${
          !disabled || "bg-gray-100"
        }`}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {texts.map((text, i) => (
        <p className="text-xs" key={i}>
          {text}
        </p>
      ))}
    </div>
  );
};

export default FormInput;
