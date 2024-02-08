import { Router } from "express";
import {
  createPayment,
  getPayment,
  paymentNotifications,
} from "../controllers/dlocalgoController.js";

const router = Router();

router.post("/createpayment", createPayment);
router.post("/paymentnotifications", paymentNotifications);
router.get("/getpayment/:id", getPayment);
export default router;
