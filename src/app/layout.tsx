"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  { name: "Home", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Products", path: "/products" },
  { name: "Dashboard", path: "/dashboard" },
];

export default function ExampleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html>
      <body>
        <div>
          {paths.map((path) => {
            const isActive = path.path === pathname;
            return (
              <div
                className={`font-bold mx-4 px-4 py-2 ${
                  isActive ? "text-red-500" : "text-blue-900"
                } `}
                key={path.name}
              >
                <Link href={path.path}>{path.name}</Link>
              </div>
            );
          })}
        </div>
        {children}
      </body>
    </html>
  );
}
