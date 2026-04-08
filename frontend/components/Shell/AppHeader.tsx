import Link from "next/link";
import { LogoutButton } from "@/components/Shell/LogoutButton";

type AppHeaderProps = {
  activeItem: "Dashboard" | "Reports" | "Settings";
};

const navItems: Array<{ href: "/dashboard" | "/reports" | "/settings"; label: AppHeaderProps["activeItem"] }> = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" }
];

export function AppHeader({ activeItem }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/dashboard">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-orbit brand-orbit-top" />
            <span className="brand-orbit brand-orbit-bottom" />
          </div>
          <span className="brand-name">OptiFlow AI</span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              className={item.label === activeItem ? "nav-link active" : "nav-link"}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-box">
          <div className="admin-avatar" aria-hidden="true">
            A
          </div>
          <span>Admin</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
