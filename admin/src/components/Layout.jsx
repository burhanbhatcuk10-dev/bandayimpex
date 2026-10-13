import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Menu, Globe, X, UserCircle2 } from "lucide-react";
import { resources, submissions } from "../config";
import { useAuth } from "../auth";
import { ResourceIcon as Icon } from "../icons";

export default function Layout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? "bg-primary-900 text-white shadow-sm shadow-primary-900/20"
        : "text-primary-700 hover:bg-white hover:text-primary-900 hover:shadow-sm"
    }`;

  const NavItem = ({ to, end, icon, children }) => (
    <NavLink to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
      {({ isActive }) => (
        <>
          <span
            className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary-500 transition-opacity ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
          {icon}
          <span className="truncate">{children}</span>
        </>
      )}
    </NavLink>
  );

  const SectionLabel = ({ children }) => (
    <p className="px-3 pt-5 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-500">
      {children}
    </p>
  );

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 self-start z-40 h-screen w-64 shrink-0 flex flex-col border-r border-line bg-secondary-300 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand lockup */}
        <div className="h-16 shrink-0 flex items-center gap-3 px-5 border-b border-secondary-400">
          <img src="/logo.svg" alt="BIPL" className="h-9 w-auto" />
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-wide text-primary-900">BIPL</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-500">
              Admin Console
            </p>
          </div>
          <button
            className="ml-auto p-1.5 -mr-2 rounded-lg text-primary-500 hover:bg-primary-100 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nice-scroll flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <NavItem to="/" end icon={<LayoutDashboard size={18} />}>
            Dashboard
          </NavItem>
          <NavItem to="/website" icon={<Globe size={18} />}>
            Manage Website
          </NavItem>

          <SectionLabel>Content</SectionLabel>
          {resources.map((r) => (
            <NavItem key={r.key} to={`/r/${r.key}`} icon={<Icon name={r.icon} size={18} />}>
              {r.label}
            </NavItem>
          ))}

          <SectionLabel>Submissions</SectionLabel>
          {submissions.map((s) => (
            <NavItem key={s.key} to={`/s/${s.key}`} icon={<Icon name={s.icon} size={18} />}>
              {s.label}
            </NavItem>
          ))}
        </nav>

        {/* Pinned footer */}
        <div className="shrink-0 border-t border-secondary-400 p-3 space-y-1">
          <NavItem to="/account" icon={<UserCircle2 size={18} />}>
            Account
          </NavItem>
          <button
            onClick={doLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 bg-primary-950/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-secondary-300 border-b border-secondary-400 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-secondary-200"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="hidden sm:inline">Signed in as</span>
            <span className="flex items-center gap-2 rounded-full bg-secondary-100 pl-1 pr-3 py-1">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-900 text-[11px] font-bold text-white">
                {(admin?.username || admin?.name || admin?.email || "A").charAt(0).toUpperCase()}
              </span>
              <span className="font-semibold text-primary-800">
                {admin?.username || admin?.name || admin?.email}
              </span>
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
