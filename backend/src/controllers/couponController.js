import CouponService from "../services/coupon.service";
import sendResponse from "../utils/response";

async function createCoupon(req, res) {
  try {
    const couponData = req.body.data;
    const createdCoupon = await CouponService.createCoupon(couponData);
    sendResponse(res, 200, createdCoupon);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getCoupons(req, res) {
  try {
    const coupons = await CouponService.getCoupons();
    sendResponse(res, 200, coupons);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getCouponById(req, res) {
  try {
    const couponId = req.params.id;
    const coupon = await CouponService.getCouponById(couponId);
    sendResponse(res, 200, coupon);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function updateCoupon(req, res) {
  try {
    const couponId = req.params.id;
    const couponData = req.body.data;
    const updatedCoupon = await CouponService.updateCoupon(
      couponId,
      couponData
    );
    sendResponse(res, 200, updatedCoupon);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function deleteCoupon(req, res) {
  try {
    const couponId = req.params.id;
    const deletedCoupon = await CouponService.deleteCoupon(couponId);
    sendResponse(res, 200, deletedCoupon);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

export { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon };
