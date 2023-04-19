"use client";

import { usePathname } from "next/navigation";
import Component from "./login-btn";
import Link from "next/link";

const navigation = [
  { name: "Estoque", href: "/" },
  { name: "Vendas", href: "/sales" },
  { name: "Dashboard", href: "/powerbi" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="navbar-nav flex-row">
          {navigation.map((item) => (
            <>
              <li className="nav-item">
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "nav-link mx-2 active"
                      : "nav-link mx-2",
                    "text-center"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            </>
          ))}
        </ul>
        <Component />
      </div>
    </nav>
  );
}
