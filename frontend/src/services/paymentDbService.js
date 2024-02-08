import axios from "axios";

const API_BASE_URL = "https://api-payment-gateway.vercel.app/api";

const createPaymentDb = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/paymentsdb/createpaymentdb`,
      {
        data: paymentData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getPayments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/paymentsdb/getpaymentsdb`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    throw error;
  }
}

const getPaymentByOrderId = async (orderId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/paymentsdb/getpaymentdb/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

const getPaymentsByPayerDocument = async (payerDocument) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/paymentsdb/getpaymentsdb/${payerDocument}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export { createPaymentDb, getPayments, getPaymentByOrderId, getPaymentsByPayerDocument };
