import React from "react";

const Input = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => (
  <div className={`input-group ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  </div>
);

export default Input;
