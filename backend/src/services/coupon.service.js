import Coupon from "../models/coupon";

class CouponService {
  async createCoupon(data) {
    try {
      const coupon = new Coupon(data);
      const createdCoupon = await coupon.save();
      return createdCoupon;
    } catch (error) {
      throw error;
    }
  }
  async getCoupons() {
    try {
      const coupons = await Coupon.find();
      return coupons;
    } catch (error) {
      throw error;
    }
  }

  async updateCoupon(id, data) {
    try {
      const updatedCoupon = await Coupon.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return updatedCoupon;
    } catch (error) {
      throw error;
    }
  }

  async getCouponById(id) {
    try {
      const coupon = await Coupon.findById(id);
      return coupon;
    } catch (error) {
      throw error;
    }
  }

  async deleteCoupon(id) {
    try {
      const coupon = await Coupon.findByIdAndDelete(id);
      return coupon;
    } catch (error) {
      throw error;
    }
  }
}

export default new CouponService();
