import PaymentDbService from "../services/paymentDb.service";
import sendResponse from "../utils/response.js";

async function createPaymentDb(req, res) {
  try {
    const paymentData = req.body.data;
    const createdPayment = await PaymentDbService.createPayment(paymentData);
    sendResponse(res, 200, createdPayment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getPayments(req, res) {
  try {
    const payments = await PaymentDbService.getPayments();
    sendResponse(res, 200, payments);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getCouponsPayments(req, res) {
  try {
    const payments = await PaymentDbService.getPayments({ type: "coupon" });
    sendResponse(res, 200, payments);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getPaymentByOrderId(req, res) {
  try {
    const paymentId = req.params.id;
    const payment = await PaymentDbService.getPaymentByOrderId(paymentId);
    sendResponse(res, 200, payment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getPaymentsByPayerDocument(req, res) {
  try {
    const payerDocument = req.params.id;
    const payments = await PaymentDbService.getPaymentsByPayerDocument(
      payerDocument
    );
    sendResponse(res, 200, payments);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

export {
  createPaymentDb,
  getPayments,
  getCouponsPayments,
  getPaymentByOrderId,
  getPaymentsByPayerDocument,
};
