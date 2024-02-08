import axios from "axios";

const API_BASE_URL = "http://https://api-payment-gateway.vercel.app/api";

const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments/createpayment`, {
      data: paymentData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getPayment = async (paymentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/getpayment/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export { createPayment, getPayment };
