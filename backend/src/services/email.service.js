import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fromEnv } from "@aws-sdk/credential-provider-env";

const sesClient = new SESClient({
  region: "us-east-2",
  credentials: fromEnv(),
});

async function sendEmail({ to, subject, htmlBody }) {
  const emailParams = {
    Source: "lassojuanfe@gmail.com",
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Html: { Data: htmlBody } },
    },
  };

  const command = new SendEmailCommand(emailParams);
  return sesClient.send(command);
}

export { sendEmail };
