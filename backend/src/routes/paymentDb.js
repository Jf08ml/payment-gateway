import { Router } from "express";
import { createPaymentDb, getPayments, getPaymentByOrderId, getPaymentsByPayerDocument } from '../controllers/paymentDbController.js';

const router = Router();

router.post("/createpaymentdb", createPaymentDb);
router.get("/getpaymentsdb", getPayments);
router.get("/getpaymentdb/:id", getPaymentByOrderId)
router.get("/getpaymentsdb/:id", getPaymentsByPayerDocument)
export default router;
