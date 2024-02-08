import MembershipService from "../services/membership.service";
import sendResponse from "../utils/response.js";

async function createMembership(req, res) {
  try {
    const paymentData = req.body.data;
    const createdPayment = await MembershipService.createMembership(
      paymentData
    );
    sendResponse(res, 200, createdPayment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getMemberships(req, res) {
  try {
    const payment = await MembershipService.getMemberships();
    sendResponse(res, 200, payment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

export { createMembership, getMemberships };
