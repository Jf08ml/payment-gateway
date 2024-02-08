function generatePaymentEmailTemplate(paymentData) {
  return `<html>
    <head>
    <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 30px;
      text-align: left;
      line-height: 1.6;
    }
    .footer {
      background-color: #f0f0f0;
      padding: 15px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      font-size: 0.9em;
    }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
            <h2>Pago de membresía básica</h2>
        </div>
        <div class="content">
          <p>Estimado ${paymentData.payer.name},</p>
          <p>Tu pago ha sido procesado exitosamente.</p>
          <p><strong>Referencia de pago:</strong> ${paymentData.order_id}</p>
          <p><strong>Monto:</strong> ${paymentData.amount} ${paymentData.currency}</p>
          <p><strong>Estado:</strong> ${paymentData.status}</p>
          <p><strong>Fecha del pago:</strong> ${paymentData.approved_date}</p>
        </div>
        <div class="footer">
            <p>Gracias por tu compra!</p>
        </div>
      </div>
    </body>
    </html>`;
}

export { generatePaymentEmailTemplate };
