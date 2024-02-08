import { useState, useEffect, useCallback } from "react";
import { getPaymentsByPayerDocument } from "../../services/paymentDbService";
import { getPayment } from "../../services/paymentService";
import "../../styles/PaymentHistoryPage.css";
import { format } from "date-fns";
import { PaymentDetails } from "./components/PaymentDetails";

const PaymentHistoryPage = () => {
  const [document, setDocument] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const results = await getPaymentsByPayerDocument(document);
        setPayments(results.data);
      } catch (err) {
        setError("Error al buscar los pagos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [document]
  );

  const handlePayment = useCallback((redirectUrl) => {
    window.open(redirectUrl, "_blank");
  }, []);

  const updatePaymentStatus = useCallback(async (paymentId, index) => {
    try {
      const updatedPayment = await getPayment(paymentId);
      if (updatedPayment.status === "PAID") {
        setPayments((currentPayments) =>
          currentPayments.map((payment, idx) =>
            idx === index ? { ...payment, status: "PROCESANDO" } : payment
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado del pago:", error);
    }
  }, []);

  useEffect(() => {
    payments.forEach((payment, index) => {
      if (payment.status === "PENDING") {
        updatePaymentStatus(payment.payment_id, index);
      }
    });
  }, [payments, updatePaymentStatus]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd/MM/yy HH:mm");
  }, []);

  return (
    <div className="payment-history-container">
      <h1>Historial de Pagos</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Ingrese número de documento"
          required
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      {!loading && !error && payments.length === 0 && (
        <p>No hay pagos para el número de documento ingresado.</p>
      )}

      <ul className="payment-list">
        {payments.map((payment) => (
          <li key={payment.payment_id} className="payment-item">
            <PaymentDetails
              payment={payment}
              formatDate={formatDate}
              handlePayment={handlePayment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistoryPage;
