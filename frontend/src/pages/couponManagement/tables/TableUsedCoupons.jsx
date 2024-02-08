import { useEffect } from "react";

export const TableUsedCoupons = ({ getAllPayments, payments, formatDate }) => {
  useEffect(() => {
    const init = async () => {
      await getAllPayments();
    };
    init();
  }, []);

  const calculateDiscountApplied = (amountPaid, discountPercentage) => {
    const originalValue = amountPaid / (1 - discountPercentage / 100);
    const discountApplied = originalValue - amountPaid;
    return discountApplied.toFixed(0);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Usado por</th>
            <th className="th">Código</th>
            <th className="th">Descuento</th>
            <th className="th">Valor pagado</th>
            <th className="th">Valor del descuento</th>
            <th className="th">Fecha de uso</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", margin: "auto" }}>
                No hay pagos con cupones registrados.
              </td>
            </tr>
          )}
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="td">{payment.payer.name}</td>
              <td className="td">{payment.coupon.code}</td>
              <td className="td">{payment.coupon.discount} %</td>
              <td className="td">$ {payment.amount}</td>
              <td className="td">
                ${" "}
                {calculateDiscountApplied(
                  payment.amount,
                  payment.coupon.discount
                )}
              </td>
              <td className="td">{formatDate(payment.approved_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
