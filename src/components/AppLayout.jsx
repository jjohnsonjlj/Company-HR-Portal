import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function AppLayout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">

        <Sidebar onLoginClick={() => setShowLogin(true)} />

        <main className="flex-1 p-8 overflow-y-auto text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>

      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}