"use client";

import { getAuthToken } from "@/services/frontend/storage.service";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      return redirect("/list-user");
    } else {
      return redirect("/login");
    }
  }, []);
};

export default Index;
