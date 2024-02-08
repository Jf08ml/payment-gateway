import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMemberships } from "../../services/membershipService";
import "../../styles/MembershipsPage.css";
import { useCurrency } from "../../contexts/CurrencyContext";

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    return (amount * rate).toFixed(2);
  } catch (error) {
    console.error("Error converting currency: ", error);
    return amount;
  }
};

const MembershipsPage = () => {
  const { currency, selectedCountry } = useCurrency();
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [convertedMemberships, setConvertedMemberships] = useState([]);

  useEffect(() => {
    const init = async () => {
      const membershipsData = await getMemberships();
      setMemberships(membershipsData.data);
      setConvertedMemberships(membershipsData.data);
    };
    init();
  }, []);

  useEffect(() => {
    convertPrices(memberships);
  }, [currency, memberships]);

  const convertPrices = async (memberships) => {
    const converted = await Promise.all(
      memberships.map(async (membership) => {
        const convertedPrice = await convertCurrency(
          membership.price,
          "COP",
          currency
        );
        return { ...membership, price: parseFloat(convertedPrice) };
      })
    );
    setConvertedMemberships(converted);
  };

  const handlePaymentClick = (membership) => {
    const paymentInformation = {
      id: membership._id,
      name: membership.name,
      price: membership.price,
      selectedCountryCode: selectedCountry.countryCode,
      currency,
    };
    navigate("/payment", {
      state: paymentInformation ,
    });
    sessionStorage.setItem("membership", JSON.stringify(paymentInformation));
  };

  if (memberships.length === 0) {
    return <div>Loading memberships...</div>;
  }

  return (
    <div className="container">
      <div className="table-container">
        <h1 className="title">Memberships</h1>
        <table className="table">
          <tbody>
            {convertedMemberships.map((membership) => (
              <tr key={membership._id}>
                <td className="td">{membership.name}</td>
                <td className="td td-price">
                  {membership.price} {currency}
                </td>
                <td className="td">
                  <button
                    onClick={() => handlePaymentClick(membership)}
                    className="button"
                  >
                    Subscribir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipsPage;
