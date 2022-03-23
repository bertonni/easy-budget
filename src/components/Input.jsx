import React from "react";

export default function Input({
  id,
  min = null,
  type = "text",
  customRef,
  placeholder,
  error = false,
  defaultValue = "",
  errorMessage,
  label,
  onChange,
  grow,
  ...props
}) {
  const growInput = grow ? 'flex-grow' : '';
  const options = {}
  if (defaultValue !== '') options['defaultValue'] = defaultValue;
  return (
    <div className={`relative mt-4 ${growInput}`}>
      <input
        id={id}
        type={type}
        {...options}
        {...props}
        min={min}
        ref={customRef}
        className="peer input"
        placeholder={placeholder}
        onChange={onChange}
      />
      <label htmlFor={id} className="input-label">
        { label }
      </label>
      {error && (
        <span className="text-sm text-red-300">
          { errorMessage }
        </span>
      )}
    </div>
  );
}
