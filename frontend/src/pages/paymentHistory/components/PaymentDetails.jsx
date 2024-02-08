export const PaymentDetails = ({ payment, formatDate, handlePayment }) => (
    <>
      <div>Referencia de pago: {payment.order_id}</div>
      <div>Id del pago: {payment.payment_id}</div>
      <div>Fecha de pago: {formatDate(payment.approved_date)}</div>
      <div>Estado: {payment.status}</div>
      <div>
        Monto: {payment.amount} {payment.currency}
      </div>
      <div>Descripción: {payment.description}</div>
      {payment.status === "PENDING" && (
        <button
          className="pay-button"
          onClick={() => handlePayment(payment.redirect_url)}
        >
          Pagar
        </button>
      )}
      {payment.status === "Procesando" && <p>Procesando...</p>}
    </>
  );