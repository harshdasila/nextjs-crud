"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster, toast } from "sonner";
import { UserProvider, useUserContext } from "@/contexts/userContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserProvider>
        <Toaster richColors position="top-right" />
        {children}
      </UserProvider>
    </>
  );
}
