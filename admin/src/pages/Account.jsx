import React, { useState } from "react";
import { KeyRound } from "lucide-react";
import { api } from "../api";
import { useAuth } from "../auth";

export default function Account() {
  const { admin } = useAuth();
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      setMsg({ ok: true, text: "Password updated." });
      setCurrent("");
      setNew("");
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-ink mb-1">Account</h1>
      <p className="text-sm text-muted mb-6">{admin?.email}</p>

      <form onSubmit={submit} className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
        <h2 className="font-bold text-ink flex items-center gap-2">
          <KeyRound size={18} /> Change Password
        </h2>
        {msg && (
          <p
            className={`text-sm rounded-lg px-3 py-2 ${
              msg.ok ? "bg-secondary-200 text-primary" : "bg-secondary-200 text-primary"
            }`}
          >
            {msg.text}
          </p>
        )}
        <div>
          <label className="block text-sm font-semibold text-primary-700 mb-1.5">Current password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrent(e.target.value)} required className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-primary-700 mb-1.5">New password</label>
          <input type="password" value={newPassword} onChange={(e) => setNew(e.target.value)} required minLength={6} className={inputCls} />
        </div>
        <button className="bg-primary hover:bg-primary-800 text-white font-bold text-sm px-5 py-2.5 rounded-lg">
          Update Password
        </button>
      </form>
    </div>
  );
}
