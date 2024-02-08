import sendResponse from "../utils/response.js";
import PaymentDbService from "../services/paymentDb.service";
import CouponService from "../services/coupon.service";
import { generatePaymentEmailTemplate } from "../services/emailTemplate.service.js";
import { sendEmail } from "../services/email.service.js";
import { sendMessageSuccessPayment } from "../services/whatsapp.service.js";

const axios = require("axios");

const { DLOCALGO_KEY, DLOCALGO_KEY_SECRET } = process.env;
const dLocalEndpointCreate = "https://api-sbx.dlocalgo.com/v1/payments";

async function createPayment(req, res) {
  try {
    const {
      amount,
      currency,
      country,
      payer,
      description,
      success_url,
      back_url,
    } = req.body.data;
    const paymentData = {
      amount,
      currency,
      country,
      payer,
      description,
      success_url,
      back_url,
      notification_url:
        "https://api-payment-gateway.vercel.app/api/payments/paymentnotifications",
    };

    const response = await axios.post(dLocalEndpointCreate, paymentData, {
      headers: {
        Authorization: `Bearer ${DLOCALGO_KEY}:${DLOCALGO_KEY_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
}

async function getPayment(req, res) {
  try {
    const paymentId = req.params.id;
    const response = await axios.get(`${dLocalEndpointCreate}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${DLOCALGO_KEY}:${DLOCALGO_KEY_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    sendResponse(res, 500, "Error al obtener el pago.");
  }
}

async function paymentNotifications(req, res) {
  try {
    const { payment_id } = req.body;
    const response = await axios.get(`${dLocalEndpointCreate}/${payment_id}`, {
      headers: {
        Authorization: `Bearer ${DLOCALGO_KEY}:${DLOCALGO_KEY_SECRET}`,
        "Content-Type": "application/json",
      },
    });
    const paymentUpdate = {
      status: response.data.status,
      redirect_url: response.data.redirect_url,
      approved_date: response.data.approved_date,
    };

    const paymentData = await PaymentDbService.updatePayment(payment_id, paymentUpdate);

    if (paymentData.status === "PAID" && paymentData.coupon !== null) {
      const coupon = await CouponService.getCouponById(paymentData.coupon);
      const updatedCoupon = {
        used: coupon.used + 1,
      };
      await CouponService.updateCoupon(coupon._id, updatedCoupon);
    }

    const htmlBody = generatePaymentEmailTemplate(paymentData);

    // Intento enviar el correo
    try {
      await sendEmail({
        to: paymentData.payer.email,
        subject: "Pago de membresía",
        htmlBody,
      });
      console.log(`Correo enviado exitosamente a ${paymentData.payer.email}`);
    } catch (emailError) {
      console.error(`Error al enviar correo a ${paymentData.payer.email}:`, emailError);
    }

    // Intento enviar el mensaje a WhatsApp
    try {
      const prefixFormated = paymentData.payer.prefix.replace(/\+/g, "");
      const recipientId = prefixFormated + paymentData.payer.phone;
      const templateName = "pago_exitoso_membresia";
      const parameters = [
        paymentData.payer.name,
        paymentData.description,
        paymentData.order_id,
      ];

      await sendMessageSuccessPayment(recipientId, templateName, parameters);
      console.log(`Mensaje de WhatsApp enviado exitosamente a ${recipientId}`);
    } catch (whatsappError) {
      console.error(`Error al enviar mensaje de WhatsApp a ${recipientId}:`, whatsappError);
    }

    res.status(200).send("Notification received and email sent");
  } catch (error) {
    console.error("Se ha presentado un error:", error);
    res.status(500).send("Error al obtener el pago.");
  }
}

export { createPayment, getPayment, paymentNotifications };

