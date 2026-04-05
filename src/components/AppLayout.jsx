import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function AppLayout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar onLoginClick={() => setShowLogin(true)} />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 🔥 Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}