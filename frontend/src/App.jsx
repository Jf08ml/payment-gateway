import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MembershipsPage from "./pages/memberships/MembershipsPage";
import PaymentFormPage from "./pages/paymentForm/PaymentFormPage";
import PaymentHandlePage from "./pages/paymentHandle/PaymentHandlePage";
import PaymentHistoryPage from "./pages/paymentHistory/PaymentHistoryPage";
import { MenuButton } from "./components/MenuButton";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { CountrySelector } from "./components/CountrySelector";
import { CurrencySelector } from "./components/CurrencySelector";
import { CouponManagement } from "./pages/couponManagement/CouponManagementPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CurrencyProvider setIsLoading={setIsLoading}>
      <BrowserRouter>
        {isLoading ? (
          <div>Cargando...</div>
        ) : (
          <div className="app-container">
            <header className="app-header">
              <div className="header-menu">
                <MenuButton name={"Home"} route={"/memberships"}/>
                <MenuButton
                  name={"Consultar pagos"}
                  route={"/payment-history"}
                />
                <MenuButton
                  name={"Administrar cupones"}
                  route={"/coupon-management"}
                />
              </div>
              <div className="header-location">
                <CountrySelector />
                <CurrencySelector />
              </div>
            </header>
            <main className="app-main">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate replace to="/memberships" />}
                />
                <Route path="/memberships" element={<MembershipsPage />} />
                <Route path="/payment" element={<PaymentFormPage />} />
                <Route path="/payment-handle" element={<PaymentHandlePage />} />
                <Route
                  path="/coupon-management"
                  element={<CouponManagement />}
                />
                <Route
                  path="/payment-history"
                  element={<PaymentHistoryPage />}
                />
              </Routes>
            </main>
          </div>
        )}
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
