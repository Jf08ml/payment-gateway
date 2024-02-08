import React, { createContext, useState, useContext, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children, setIsLoading }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currency, setCurrency] = useState("");
  const [listCurrencies, setCurrenciesList] = useState([]);

  const availableCountries = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Ecuador",
    "Guatemala",
    "Mexico",
    "Panama",
    "Peru",
    "Paraguay",
    "Uruguay",
    "Indonesia",
    "Malasia",
    "Kenia",
    "Nigeria",
  ];

  const fetchCountriesData = async (setCountries) => {
    const url = "https://restcountries.com/v3.1/all";
    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredCountries = data
        .filter(
          (country) =>
            country.currencies &&
            country.cca2 &&
            availableCountries.includes(country.name.common)
        )
        .map((country) => ({
          name: country.name.common,
          countryCode: country.cca2,
          currency: Object.keys(country.currencies)[0],
          prefix: country.idd.root + country.idd.suffixes,
        }));
      setCountries(filteredCountries);
      await fetchCurrentLocation(
        setSelectedCountry,
        setCurrency,
        filteredCountries
      );
    } catch (error) {
      console.error("Error fetching countries: ", error);
    }
  };

  const fetchCurrentLocation = async (
    setSelectedCountry,
    setCurrency,
    countries
  ) => {
    const url = `https://ipapi.co/json/`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const userCountry = countries.find(
        (country) => country.countryCode === data.country_code
      );
      if (userCountry) {
        setSelectedCountry(userCountry);
        setCurrency(userCountry.currency);
        setCurrenciesList([userCountry.currency, "USD"]);
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchCountriesData(setCountries);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Manejador del cambio de país
  const handleCountryChange = (countryCode) => {
    const country = countries.find(
      (country) => country.countryCode === countryCode
    );
    setSelectedCountry(country);
    if (country.name === "Panama") {
      setCurrenciesList(["USD"]);
      setCurrency("USD");
    } else {
      setCurrency(country.currency);
      setCurrenciesList([country.currency, "USD"]);
    }
  };

  // Manejador del cambio de moneda
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        countries,
        selectedCountry,
        currency,
        handleCountryChange,
        handleCurrencyChange,
        listCurrencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
