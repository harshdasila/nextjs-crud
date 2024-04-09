"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/loader";
import { UserDetailsInterface } from "@/interfaces/frontend";
import Navbar from "@/components/navbar";
import { getUserData } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { getAuthToken } from "@/services/frontend/storage.service";
import { useUserDetails } from "@/hooks/useUserDetails";

const UserData = ({ params }: { params: { user_id: string } }) => {
  useUserDetails();
  const [userDetails, setUserDetails] = useState({
    user_number: "",
    user_created_at: "",
    user_name: "",
    user_email: "",
  });

  const router = useRouter();
  const userId = Number(params.user_id);

  async function handleGetUserDetails() {
    const authHeader = getAuthToken();
    const response: any = await getUserData(userId,authHeader);
    if (!response) {
      router.push("/list-user"); 
    }
    setUserDetails(response);
  }

  useEffect(() => {
    handleGetUserDetails();
  }, [userId]);



  const name = userDetails?.user_name;
  const email = userDetails?.user_email;
  const phoneNumber = userDetails?.user_number;
  const created_at = String(userDetails?.user_created_at);

  if(!userDetails){
    return <Loader/>
  }

  return (
    <>
      {/* <Navbar /> */}

      <div className="flex justify-center items-center h-screen">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-[600px]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 ">
              {name}'s Profile
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="sm:divide-y sm:divide-gray-200 ">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Full name
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {name}
                </div>
              </div>

              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Email address
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </div>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Phone number
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {phoneNumber}
                </div>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Created At
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {created_at.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
          <Link href={"/list-user"}>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-4 "
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserData;
