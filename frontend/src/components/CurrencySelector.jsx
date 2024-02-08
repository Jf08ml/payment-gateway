import React from "react";
import Select from "react-select";
import { useCurrency } from "../contexts/CurrencyContext";

export const CurrencySelector = () => {
  const { currency, handleCurrencyChange, listCurrencies } = useCurrency();

  const availableCurrencies = [...new Set(listCurrencies)].map((cur) => ({
    value: cur,
    label: cur,
  }));

  const handleChange = (selectedOption) => {
    handleCurrencyChange(selectedOption ? selectedOption.value : "");
  };

  const selectedCurrency = availableCurrencies.find(
    (cur) => cur.value === currency
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "blue" : "gray",
      boxShadow: state.isFocused ? "0 0 0 1px blue" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "darkblue" : "lightgray",
      },
      width: "auto",
      fontSize: "0.8rem"
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "blue"
        : state.isFocused
        ? "lightblue"
        : null,
        fontSize: "0.8rem"
    }),
  };

  return (
    <Select
      value={selectedCurrency}
      onChange={handleChange}
      options={availableCurrencies}
      styles={customStyles}
      placeholder="Selec. moneda"
      isSearchable
    />
  );
};
