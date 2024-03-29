import { useState, useEffect } from "react";
import { Modal } from "../../../components/modal";

export const CouponForm = ({
  isOpen,
  onClose,
  createNewCoupon,
  updatedCreatedCoupon,
  couponEdit,
  isEditMode,
}) => {
  const initialState = {
    name: "",
    code: "",
    discount: "",
    expiration: new Date().toISOString().split("T")[0],
    limit: "",
    applicable: [],
  };

  const [coupon, setCoupon] = useState(initialState);

  useEffect(() => {
    if (isEditMode) {
      const editedCoupon = {
        _id: couponEdit._id,
        name: couponEdit.name || "",
        code: couponEdit.code || "",
        discount: couponEdit.discount || "",
        expiration: new Date(couponEdit.expiration).toISOString().split("T")[0], // Formatea la fecha adecuadamente
        limit: couponEdit.limit || "",
        applicable: couponEdit.applicable || [],
      };
      setCoupon(editedCoupon);
    }
  }, [couponEdit, isEditMode]);

  useEffect(() => {
    if (!isOpen) {
      setCoupon(initialState);
    }
  }, [isOpen]);

  const handleFormChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) return updatedCreatedCoupon(coupon);
    createNewCoupon(coupon);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>{isEditMode ? "Editar Cupón" : "Crear Cupón"}</h2>
        <form>
          <div>
            <input
              placeholder="Nombre"
              type="text"
              name="name"
              value={coupon.name}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <input
              placeholder="Código"
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <input
              placeholder="Descuento"
              type="number"
              name="discount"
              value={coupon.discount}
              onChange={handleFormChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              margin: "auto",
              flexDirection: "column",
              width: "49%",
            }}
          >
            <label>Fecha de Expiración</label>
            <input
              type="date"
              name="expiration"
              value={coupon.expiration}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <input
              placeholder="Límite de uso"
              type="number"
              name="limit"
              value={coupon.limit}
              onChange={handleFormChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{ marginRight: "10px" }}
            >
              Cerrar
            </button>
            <button className="button" type="submit" onClick={handleFormSubmit}>
              {isEditMode ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
