import React from "react";
import AdminNavbar from "./components/navbar";

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
}
