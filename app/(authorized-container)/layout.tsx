"use client";

import { Toaster, toast } from "sonner";
import Navbar from "@/components/navbar";
import { useEffect } from "react";
import { getAuthToken } from "@/services/frontend/storage.service";
import { useRouter } from "next/navigation";
import { UserProvider, useUserContext } from "@/contexts/userContext";
import axios from "axios";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { setUser } = useUserContext();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      return router.push("/login");
    }
    setUserData();
  }, []);

  async function setUserData() {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/admin/me", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      if (res.data.id && res.data.role_id) {
        setUser({
          id: res.data.id,
          role_id: res.data.role_id,
        });
      }
    } catch (error) {
      console.log("error in getting user details", error);
    }
  }
  return <>{[<Navbar key="navbar" />, children]}</>;
}
