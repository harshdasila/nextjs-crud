"use client"
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/services/frontend/storage.service";
import { NextResponse } from "next/server";

export async function useUserDetails() {
  const router = useRouter();
  useEffect(() => {
    
    axios
      .get("http://localhost:3000/api/v1/me", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        if (!res.data.id || !res.data.role_id) {
          removeAuthToken();
          router.push("/login");
        }
      })
      .catch((error) => {
        removeAuthToken();
        router.push("/login");
      });
  },[]);
}
