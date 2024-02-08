import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const createCoupon = async (couponData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/coupons/createcoupon`,
      {
        data: couponData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el cupón:", error);
    throw error;
  }
}

const getCoupons = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/coupons/getcoupons`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cupones:", error);
    throw error;
  }
}

const getCouponById = async (couponId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/coupons/getcoupon/${couponId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cupón:", error);
    throw error;
  }
}

const updateCoupon = async (couponId, couponData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/coupons/updatecoupon/${couponId}`,
      {
        data: couponData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cupón:", error);
    throw error;
  }
}

const deleteCoupon = async (couponId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/coupons/deletecoupon/${couponId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el cupón:", error);
    throw error;
  }
}

export { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon };