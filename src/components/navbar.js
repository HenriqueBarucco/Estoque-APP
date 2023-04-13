"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Estoque", href: "/" },
  { name: "Vendas", href: "/sales" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppNavbar() {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);

  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <ul class="navbar-nav flex-row">
          {navigation.map((item) => (
            <>
              <li class="nav-item">
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
      </div>
    </nav>
  );
}
