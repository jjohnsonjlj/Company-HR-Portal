import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import AuthGuard from "./components/AuthGuard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* User Dashboard (only when logged in) */}
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Route>

      {/* Admin Dashboard */}
      <Route element={<AuthGuard role="ADMIN" />}>
        <Route element={<AppLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;