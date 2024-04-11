"use client";

import Link from "next/link";
import { NextRequest, NextResponse } from "next/server";

export default function settings() {
  return (
    <>
      <div className="p-2 mt-10">
        <div className="flex justify-center items-center p-5 m-3">
          <div className="text-3xl font-bold font-sans">Settings</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="">
            <div className="flex justify-between items-center w-[80vw] my-2 border border-black p-3">
              <div className=" ">Edit Super Admin Details</div>
              <div className="">
                <Link href={`/settings/super-admin`}>Edit</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <div className="">
            <div className="flex justify-between items-center w-[80vw] my-2 border border-black p-3">
              <div className=" ">Change Password</div>
              <div className="">
                <Link href={`/change-password`}>Edit</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <div className="">
            <div className="flex justify-between items-center w-[80vw] my-2 border border-black p-3">
              <div className=" ">Basic Details</div>
              <div className="">
                <Link href={`/settings/basic-details`}>Edit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
