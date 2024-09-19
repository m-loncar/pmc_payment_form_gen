interface SelectFieldProperties {
    id: string;
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
  }
  
  export default function SelectField({
    id,
    label,
    value,
    options,
    onChange,
    required = false,
  }: SelectFieldProperties) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none sm:text-sm select-field"
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  