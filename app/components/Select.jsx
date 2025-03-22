const Select = ({
  id,
  title,
  options = [],
  includeFirst = true,
  className,
  onChange,
}) => {
  // const {register} = useForm();
  return (
    <label htmlFor={id} className="w-full flex flex-col gap-y-3 my-3">
      <span className="text-writing text-base lg:text-lg font-semibold">
        {title}
      </span>
      <select
        name={id}
        id={id}
        className="select select-bordered w-full focus:outline-0 focus:border-primary"
        onChange={onChange}
        defaultValue={"none"}
      >
        {includeFirst ? <option value="none" disabled></option> : ""}
        {options.map((option, i) => (
          <option key={i} value={option.split(" ").at(0).toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
