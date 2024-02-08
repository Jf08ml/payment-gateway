import Select from "react-select";
import { useCurrency } from "../contexts/CurrencyContext";

export const CountrySelector = () => {
  const { countries, selectedCountry, handleCountryChange } = useCurrency();

  const options = countries.map((country) => ({
    value: country.countryCode,
    label: country.name,
  }));

  const handleChange = (selectedOption) => {
    handleCountryChange(selectedOption.value);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedCountry?.countryCode
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
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      placeholder="Seleccionar país"
      isSearchable
    />
  );
};
