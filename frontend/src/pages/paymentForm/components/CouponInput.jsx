export const CouponInput = ({ handleChange, applyCoupon }) => {
  return (
    <>
      <input
        name="coupon"
        style={{ marginBottom: "10px" }}
        type="text"
        placeholder="Código de cupón"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          applyCoupon();
        }}
        style={{ marginBottom: "10px" }}
      >
        Aplicar
      </button>
    </>
  );
};
