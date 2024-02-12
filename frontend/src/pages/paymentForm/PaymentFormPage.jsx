import React, { useState, useEffect } from "react";
import "../../styles/PaymentFormPage.css";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../services/paymentService";
import { createPaymentDb } from "../../services/paymentDbService";
import { PaymentForm } from "./components/PaymentForm";
import { PurchaseSummary } from "./components/PurchaseSummary";
import { useCurrency } from "../../contexts/CurrencyContext";
import { CouponInput } from "./components/CouponInput";
import { getCoupons } from "../../services/couponService";

const PaymentFormPage = () => {
  const { currency, selectedCountry, countries } = useCurrency();
  const location = useLocation();
  const [membership, setMembership] = useState(
    () =>
      JSON.parse(sessionStorage.getItem("membership")) ||
      location.state?.membership ||
      ""
  );
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedFormData = sessionStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          name: "",
          document: "",
          email: "",
          profession: "",
          phone: "",
        };
  });
  const [coupon, setCoupon] = useState("");
  const [couponId, setCouponId] = useState("");

  useEffect(() => {
    const paymentCreated = sessionStorage.getItem("paymentCreated");
    if (paymentCreated) {
      window.location.href = `${window.location.origin}/payment-handle`;
    }
  }, []);

  useEffect(() => {
    if (membership.price && currency) {
      convertCurrency(membership.price, membership.currency, currency);
    }
  }, [membership.price, currency]);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
      setConvertedPrice(amount);
      return;
    }
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConvertedPrice((amount * rate).toFixed(2));
    } catch (error) {
      console.error("Error al convertir la moneda: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeCoupon = (e) => {
    const { value } = e.target;
    setCoupon(value);
  };

  const applyCoupon = async () => {
    if(couponId != "") return alert("Ya has aplicado un cupón");
    const coupons = await getCoupons();
    const couponData = coupons.data.filter((cou) => cou.code === coupon);
    const currentDate = new Date();

    if (
      couponData.length > 0 &&
      couponData[0].active &&
      couponData[0].used < couponData[0].limit &&
      new Date(couponData[0].expiration) > currentDate
    ) {
      const newPrice = (
        convertedPrice -
        (convertedPrice * couponData[0].discount) / 100
      ).toFixed(2);
      setCouponId(couponData[0]._id);
      setConvertedPrice(newPrice);
    } else {
      alert("El cupón no es válido o a vencido.");
    }
  };

  const handlePaymentDb = async (payment) => {
    const paymentDataDb = {
      payment_id: payment.id,
      order_id: payment.order_id,
      amount: convertedPrice,
      currency: currency,
      country: formData.country,
      status: payment.status,
      payer: formData,
      description: membership.name,
      redirect_url: payment.redirect_url,
      coupon: couponId != "" ? couponId : null,
    };
    try {
      const response = await createPaymentDb(paymentDataDb);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const infoPayment = {
      amount: convertedPrice,
      currency: currency,
      country: selectedCountry.countryCode,
      payer: formData,
      description: membership.name,
      success_url: `${window.location.origin}/payment-handle`,
      back_url: `${window.location.origin}/payment`,
    };
    console.log(infoPayment);
    try {
      const response = await createPayment(infoPayment);
      sessionStorage.setItem("paymentId", response.id);
      sessionStorage.setItem("memberShip", JSON.stringify(membership));
      await handlePaymentDb(response);
      sessionStorage.setItem("paymentCreated", "true");
      window.location.href = response.redirect_url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="paymentFormPage">
      <h2>Datos del comprador</h2>
      <form onSubmit={handleSubmit} className="paymentForm">
        <PaymentForm
          formData={formData}
          countries={countries}
          handleChange={handleChange}
        />
        <PurchaseSummary
          memberShip={membership.name}
          currency={currency}
          price={convertedPrice}
        />
        <CouponInput
          handleChange={handleChangeCoupon}
          applyCoupon={applyCoupon}
        />
        <button type="submit" className="button">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default PaymentFormPage;
