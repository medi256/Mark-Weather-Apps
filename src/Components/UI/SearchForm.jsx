import React from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

const SearchForm = ({ value, onChange, onSubmit, placeholder = "Search" }) => (
  <form className="search-form" onSubmit={onSubmit}>
    <Input
      id="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    <Button type="submit">🔍</Button>
  </form>
);

export default SearchForm;
