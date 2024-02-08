const axios = require("axios");

const sendMessageSuccessPayment = async (
  recipientId,
  templateName,
  parameters
) => {
  const url = "https://graph.facebook.com/v18.0/187839294421892/messages";
  const { WHATSAPP_ACCESS_TOKEN } = process.env;

  try {
    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: recipientId,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "es",
          },
          components: [
            {
              type: "body",
              parameters: parameters.map((param) => ({
                type: "text",
                text: param,
              })),
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error al enviar mensaje:",
      error.response?.data || error.message
    );
  }
};

module.exports = { sendMessageSuccessPayment };
