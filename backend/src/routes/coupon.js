import { Router } from "express";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "../controllers/couponController";

const router = Router();

router.post("/createcoupon", createCoupon);
router.get("/getcoupons", getCoupons);
router.get("/getcoupon/:id", getCouponById);
router.put("/updatecoupon/:id", updateCoupon);
router.delete("/deletecoupon/:id", deleteCoupon);

export default router;