"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuperAdmineditUserSchema, editUserSchema } from "@/schemas/frontend";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/error-message";
import {
  EditFormData,
  SuperAdminEditFormData,
  UserStateData,
} from "@/interfaces/frontend";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";
import redirectAuthorizedPath from "@/lib/unauthorized-redirect";

export default function superAdmin() {
  const router = useRouter();
  const [superAdminData, setSuperAdminData] = useState();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SuperAdminEditFormData>({
    resolver: zodResolver(SuperAdmineditUserSchema),
  });

  async function getUserData() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/admin/super-admin`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      const userData = response.data.superAdmin;
      console.log(userData, "userdata");
      setSuperAdminData(userData);
      setValue("name", userData.user_name);
      setValue("email", userData.user_email);
      setValue("number", userData.user_number);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
      router.push("/list-user");
    }
  }

  function userEditedMessage() {
    toast.success("User Edited Successfully!");
  }

  useEffect(() => {
    getUserData();
  }, []);

  const onSubmit = async (data: SuperAdminEditFormData) => {
    console.log("Sclicked");
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/admin/super-admin/${user.id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log("User edited successfully", res);
      userEditedMessage();
      router.push("/settings");
    } catch (error: any) {
      console.error("Error editing user:", error);
      redirectAuthorizedPath(error.response.status);

      // router.push("/settings");
      // Handle error (e.g., show error message)
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="p-3 mt-10">
        <div className="flex justify-center items-center p-5 m-3">
          <div className="text-3xl font-bold font-sans">Settings</div>
        </div>
        <div className="flex justify-center items-center ">
          <div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white overflow-hidden shadow rounded-lg border w-[600px]">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                      Super Admin Details
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0 text-center">
                    <div className="sm:divide-y sm:divide-gray-200 ">
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-sm font-medium flex items-center">
                          <div> Full name</div>
                        </div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                          <input
                            className="p-3 border border-black rounded-lg"
                            placeholder="name"
                            {...register("name")}
                          />
                          <div>
                            {errors.name && (
                              <ErrorMessage text={errors.name.message || ""} />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                        <div className="text-sm font-medium flex items-center">
                          <div>Email address</div>
                        </div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            className="p-3 border border-black rounded-lg"
                            placeholder="email"
                            {...register("email")}
                          />
                          <div>
                            {errors.email && (
                              <ErrorMessage text={errors.email.message || ""} />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                        <div className="text-sm font-medium flex items-center">
                          <div> Phone number</div>
                        </div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            className="p-3 border border-black rounded-lg"
                            placeholder="number"
                            {...register("number")}
                          />
                          <div>
                            {errors.number && (
                              <ErrorMessage
                                text={errors.number.message || ""}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 m-2">
                    <Link
                      className="text-black bg-white border border-black hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                      href={"/settings"}
                    >
                      Back
                    </Link>
                    <button
                      type="submit"
                      className="text-white bg-blue-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-gray-800 dark:text-whiteml-4"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              {/* <br></br>
              <div className="bg-white overflow-hidden shadow rounded-lg border w-[600px]">
                <div className="p-2">
                <label className="">Select Number of rows</label>
                <select className="float-end">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                </select>
                </div> */}
               
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
