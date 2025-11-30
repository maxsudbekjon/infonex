// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./Pages/Login";
import ProtectedRoute from "./adminPanelComponents/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";
import AdminPanelLayout from "./layouts/AdminPanelLayout";


function Dashboard() {
  return (
    <>
      <AdminPanelLayout />
    </>
  )
}

export default function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
  );
}
