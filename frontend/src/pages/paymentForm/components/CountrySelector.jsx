
export const CountrySelector = ({
  countries,
  selectedCountry,
  handleCountryChange,
}) => {
  return (
    <select
      value={selectedCountry?.countryCode || ""}
      onChange={handleCountryChange}
    >
      {countries.map((country) => (
        <option key={country.countryCode} value={country.countryCode}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
