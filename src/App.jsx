import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function HomeRedirect() {
  const { isAuthenticated } = useAuth();


  return (
      <Navigate
          to={isAuthenticated ? "/dashboard" : "/login"}
          replace
      />
  );


}

export default function App() {
  return ( <AuthProvider> <BrowserRouter> <Routes>
  <Route path="/" element={<HomeRedirect />} />
  <Route path="/login" element={<Login />} />
  <Route
  path="/dashboard"
  element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>
  }
  />
  <Route path="*" element={<HomeRedirect />} /> </Routes> </BrowserRouter> </AuthProvider>
  );
}
