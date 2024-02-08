export const PurchaseSummary = ({ memberShip, currency, price }) => {
  return (
    <div>
      <h2>Resumen de la Compra</h2>
      <p>{memberShip}</p>
      <p>
        Total: {currency} {price}
      </p>
    </div>
  );
};
