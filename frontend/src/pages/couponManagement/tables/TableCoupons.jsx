import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const TableCupons = ({
  coupons,
  formatDate,
  openModalEdit,
  deleteCreatedCoupon,
  toggleCouponStatus
}) => {
  const handleClickEdit = (coupon) => {
    openModalEdit(coupon);
  };

  const handleClickDelete = (couponId) => {
    deleteCreatedCoupon(couponId);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="th">Nombre</th>
          <th className="th">Código</th>
          <th className="th">Descuento</th>
          <th className="th">Estado</th>
          <th className="th">Uso</th>
          <th className="th">Fecha de Expiración</th>
          <th className="th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {coupons.length === 0 && (
          <tr>
            <td colSpan="7" style={{ textAlign: "center", margin: "auto" }}>
              No hay cupones registrados.
            </td>
          </tr>
        )}
        {coupons.map((coupon) => (
          <tr key={coupon._id}>
            <td className="td">{coupon.name}</td>
            <td className="td">{coupon.code}</td>
            <td className="td">{coupon.discount} %</td>
            <td className="td">
              <button
                className={coupon.active ? "button" : ""}
                onClick={() => toggleCouponStatus(coupon._id)}
              >
                {coupon.active ? "Activo" : "Inactivo"}
              </button>
            </td>
            <td className="td">
              {coupon.used}/{coupon.limit}
            </td>
            <td className="td">{formatDate(coupon.expiration)}</td>
            <td className="td">
              <button
                className="button-icon"
                onClick={() => handleClickEdit(coupon)}
              >
                <FaRegEdit />
              </button>
              <button
                className="button-icon"
                onClick={() => handleClickDelete(coupon._id)}
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
