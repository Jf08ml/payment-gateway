import React, { useState, useEffect } from "react";
import { getPaymentByOrderId } from "../../services/paymentDbService";
import { Link } from "react-router-dom";
import "../../styles/PaymentHandlePage.css";

const PaymentHandlePage = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const orderId = sessionStorage.getItem("paymentId");
        const paymentData = await getPaymentByOrderId(orderId);
        setPayment(paymentData.data);

        // localStorage.removeItem("formData");
        // localStorage.removeItem("membership");
        // localStorage.removeItem("price");
        // localStorage.removeItem("paymentId");
        // localStorage.removeItem("selectedCountryCode");
        // sessionStorage.removeItem("paymentCreated");
        sessionStorage.clear();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, []);

  if (loading) return <div>Cargando detalles del pago...</div>;
  if (error) return <div>Error al cargar el pago: {error.message}</div>;
  if (!payment) return <div>No se encontró el pago</div>;

  // Función para determinar el mensaje según el estado del pago
  const paymentStatusMessage = () => {
    switch (payment.status) {
      case "PAID":
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha sido efectuado correctamente.`;
      case "PENDING":
        return (
          <>
            {`Estimado ${payment.payer.name}, el pago de su ${payment.description} está procesando, por favor valide mas tarde o en la sección `}
            <Link to="/payment-history">historial de pagos</Link>
            {"."}
          </>
        );
      case "REJECTED":
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha sido rechazado.`;
      case "CANCELLED":
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha sido cancelado.`;
      case "EXPIRED":
        return `Estimado ${payment.payer.name}, el pago de su ${payment.description} ha expirado.`;
      default:
        return `Estimado ${payment.payer.name}, el estado de su pago (${payment.status}) es desconocido.`;
    }
  };

  return (
    <div className="payment-container">
      <h1 className="center-text">Detalles del Pago</h1>
      <div className="payment-details">
        <p>{paymentStatusMessage()}</p>
        <p>
          Referencia del pago:{" "}
          <span className="strong-text">{payment.order_id}</span>
          {" - "}Id del pago: <span className="strong-text">{payment.payment_id}</span>
        </p>
        <p>
          Total pagado:{" "}
          <span className="strong-text">
            {payment.currency} {payment.amount}
          </span>
        </p>
        <div className="home-button">
          <Link to="/" className="btn btn-primary">
            Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentHandlePage;
