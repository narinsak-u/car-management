import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { HomePage } from "@/pages/index";
import { DashboardPage } from "@/pages/dashboard";
import { AllCarsPage } from "@/pages/all-cars";
import { AddCarPage } from "@/pages/add-car";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="cars" element={<AllCarsPage />} />
          <Route path="cars/new" element={<AddCarPage />} />
          <Route path="cars/:id/edit" element={<AddCarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
