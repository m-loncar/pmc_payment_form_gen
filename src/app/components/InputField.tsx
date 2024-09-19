interface InputFieldProperties {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    maxLength?: number;
    pattern?: string;
    required?: boolean;
  }
  
  export default function InputField({
    id,
    label,
    value,
    onChange,
    placeholder,
    maxLength,
    pattern,
    required = false,
  }: InputFieldProperties) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm input-field"
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          required={required}
        />
      </div>
    );
  }
  