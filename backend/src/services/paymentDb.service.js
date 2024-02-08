import PaymentDb from "../models/paymentsDb";

class PaymentDbService {
  async createPayment(payment) {
    try {
      const paymentDb = new PaymentDb(payment);
      const createdPayment = await paymentDb.save();
      return createdPayment;
    } catch (error) {
      throw error;
    }
  }

  async getPayments(filter = {}) {
    try {
      const payments = await PaymentDb.find(filter).populate('coupon').exec();
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentByOrderId(orderId) {
    try {
      const payment = await PaymentDb.findOne({ payment_id: orderId });
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentsByPayerDocument(payerDocument) {
    try {
      const payments = await PaymentDb.find({
        "payer.document": payerDocument,
      });
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async updatePayment(paymentId, paymentUpdate) {
    try {
      const updatedPayment = await PaymentDb.findOneAndUpdate(
        { payment_id: paymentId },
        paymentUpdate,
        { new: true }
      );
      return updatedPayment;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentDbService();
