import "./config/db.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import paymentsRoutes from "./routes/payments.js";
import paymentDbRoutes from "./routes/paymentDb.js";
import membershipRoutes from "./routes/membership.js";
import couponRoutes from "./routes/coupon.js";

const app = express();

app.use(cors({ origin: "*" }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/payments", paymentsRoutes);
app.use("/api/paymentsdb", paymentDbRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/coupons", couponRoutes);

app.get("/", (req, res) => {
  res.send("API pasarela");
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;
  let message = err.message;

  if (process.env.NODE_ENV === "production" && !err.statusCode) {
    message = "Ocurrió un error en el servidor";
  }

  res.status(statusCode).json({ result: "error", message: message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
