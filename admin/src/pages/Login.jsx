import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth";
import { LogIn } from "lucide-react";

export default function Login() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 rounded bg-primary text-white font-extrabold tracking-wider">
            BIPL
          </span>
        </div>
        <h1 className="text-xl font-bold text-ink text-center">Admin Sign In</h1>
        <p className="text-sm text-muted text-center mb-6">Manage your site content</p>

        {error && (
          <div className="mb-4 text-sm text-primary bg-secondary-200 border border-line rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <label className="block text-sm font-semibold text-primary-700 mb-1.5">Email or username</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="admin@britannia.local or admin.bipl"
          className="w-full px-3 py-2 rounded-lg border border-line text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <label className="block text-sm font-semibold text-primary-700 mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-line text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          <LogIn size={18} /> {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
