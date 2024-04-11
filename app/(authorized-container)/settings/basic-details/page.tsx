"use client";

import { getAuthToken } from "@/services/frontend/storage.service";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import redirectAuthorizedPath from "@/lib/unauthorized-redirect";

export default function basicDetails() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  function handleClick() {
    submitBasicDetails();
  }
  function settingsEditedMessage() {
    toast.success("Settings Updated Successfully!");
  }

  async function submitBasicDetails() {
    const response = await axios.put(
      "http://localhost:3000/api/v1/admin/settings",
      {
        rowsPerPage,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    if (response) {
      settingsEditedMessage();
      router.push("/list-user");
    } else {
      console.log("error ocurrered on updating settings");
      router.push("/list-user");
    }
  }

  const handleChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/admin/settings", {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then((res) => {
        const rowsPerPageSetting = res.data.res.find(
          (setting: { setting_key: string }) =>
            setting.setting_key === "rowsPerPage"
        );
        if (rowsPerPageSetting) {
          setRowsPerPage(rowsPerPageSetting.setting_value);
        }
      })
      .catch((error) => {
        if(error.response.status===401){
          router.push('/list-user')
        }

        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <>
      <div>
        <div className="mt-20 ">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold">Basic Details</h1>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="overflow-hidden shadow rounded-lg border w-[600px]">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border border-b-black">
                <div className="text-md font-medium flex items-center">
                  <div> Rows Per Page</div>
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                  <select
                    className="float-end p-2"
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleChange}
                  >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
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
                  onClick={handleClick}
                  type="button"
                  className="text-white bg-blue-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-gray-800 dark:text-whiteml-4"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
