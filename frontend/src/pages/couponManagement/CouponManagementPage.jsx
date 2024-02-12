import { useState, useEffect, useCallback } from "react";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "../../services/couponService";
import { getMemberships } from "../../services/membershipService";
import { getPayments } from "../../services/paymentDbService";
import { format } from "date-fns";
import { TableCupons } from "./tables/TableCoupons";
import { TableUsedCoupons } from "./tables/TableUsedCoupons";
import { CouponForm } from "./modals/CouponForm";

const getAllCoupons = async () => {
  const couponsData = await getCoupons();
  return couponsData.data;
};

export const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponEdit, setCouponEdit] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showUsedCoupons, setShowUsedCoupons] = useState(false);

  useEffect(() => {
    const init = async () => {
      const couponsData = await getAllCoupons();
      const membershipsData = await getMemberships();
      setMemberships(membershipsData.data);
      setCoupons(couponsData);
    };
    init();
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";

    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2].split("T")[0], 10);

    const date = new Date(year, month, day);

    return format(date, "dd/MM/yy");
  }, []);

  // Funciones para manejar los cupones
  const createNewCoupon = async (couponData) => {
    const newCoupon = await createCoupon(couponData);
    setCoupons((prev) => [...prev, newCoupon.data]);
    setIsModalOpen(false);
  };

  const updatedCreatedCoupon = async (couponData) => {
    await updateCoupon(couponData._id, couponData);
    await getAllCoupons().then((couponsData) => setCoupons(couponsData));
    setIsModalOpen(false);
  };

  const deleteCreatedCoupon = async (couponId) => {
    await deleteCoupon(couponId);
    await getAllCoupons().then((couponsData) => setCoupons(couponsData));
  };

  const toggleCouponStatus = async (id) => {
    const coupon = await getCouponById(id);
    const updatedCouponData = {
      active: !coupon.data.active,
    };
    await updateCoupon(id, updatedCouponData);
    await getAllCoupons().then((couponsData) => setCoupons(couponsData));
  };

  // Funciones para consultar uso de cupones
  const getAllPayments = async () => {
    const paymentsData = await getPayments();
    const itemsWithCoupon = paymentsData.data.filter(
      (payment) => payment.coupon !== null
    );
    setPayments(itemsWithCoupon);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCouponEdit({});
  };

  const openModalEdit = (coupon) => {
    setCouponEdit(coupon);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <CouponForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        createNewCoupon={createNewCoupon}
        updatedCreatedCoupon={updatedCreatedCoupon}
        couponEdit={couponEdit}
        isEditMode={isEditMode}
      />
      <div className="table-container">
        <div style={{ display: "flex", width: "auto" }} align="center">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              margin: "auto",
              width: "60%",
            }}
          >
            {!showUsedCoupons ? (
              <h1 className="title">Cupones</h1>
            ) : (
              <h1 className="title">Historial de usos</h1>
            )}
          </div>
          <div style={{ margin: "auto", width: "40%" }} align="right">
            {!showUsedCoupons ? (
              <button className="button" onClick={() => setIsModalOpen(true)}>
                Crear
              </button>
            ) : null}
            <button
              style={{ marginInline: "5px" }}
              onClick={() => setShowUsedCoupons(!showUsedCoupons)}
            >
              {showUsedCoupons ? "Ver cupones" : "Ver usos"}
            </button>
          </div>
        </div>
        <div style={{ margin: "auto", width: "100%" }}>
          {!showUsedCoupons ? (
            <TableCupons
              coupons={coupons}
              formatDate={formatDate}
              openModalEdit={openModalEdit}
              deleteCreatedCoupon={deleteCreatedCoupon}
              toggleCouponStatus={toggleCouponStatus}
            />
          ) : (
            <TableUsedCoupons
              getAllPayments={getAllPayments}
              payments={payments}
              formatDate={formatDate}
              showUsedCoupons={showUsedCoupons}
            />
          )}
        </div>
      </div>
    </div>
  );
};
