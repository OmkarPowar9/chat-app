function Input({ type, value, setValue, placeholder, onKeyDown }) {
  return (
    <input
      type={type || "text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={`${placeholder || ""}`}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
