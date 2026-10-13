import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResourceList from "./pages/ResourceList";
import ResourceForm from "./pages/ResourceForm";
import Submissions from "./pages/Submissions";
import Website from "./pages/Website";
import Account from "./pages/Account";

const Protected = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen grid place-items-center text-primary-400">Loading…</div>;
  }
  return admin ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/website" element={<Website />} />
        <Route path="/r/:key" element={<ResourceList />} />
        <Route path="/r/:key/new" element={<ResourceForm />} />
        <Route path="/r/:key/:id" element={<ResourceForm />} />
        <Route path="/s/:key" element={<Submissions />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
