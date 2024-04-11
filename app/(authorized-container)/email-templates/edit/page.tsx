"use client";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import Loader from "@/components/loader";
import { EmailTemplateData } from "@/interfaces/frontend";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import redirectAuthorizedPath from "@/lib/unauthorized-redirect";

export default function EditEmailTemplate() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplateData>();

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const editedData = {
    subject,
    content,
  };

  function editedTemplateSuccess() {
    toast.success("Email Template Edited Successfully!");
  }

  useEffect(() => {
    axios
      .post(
        `http://localhost:3000/api/v1/admin/email-template/edit`,
        {
          slug: slug,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setEmailTemplate(response.data.data);
        setSubject(response.data.data?.et_subject || "");
        setContent(response.data.data?.et_content || "");
      })
      .catch((error) => {
        console.log(error);
        console.log("edit in addatr")
        redirectAuthorizedPath(error.response.status)
        router.push("../email-templates");
        console.error("Error in fetching Email Template Data");
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/admin/email-template/edit",
        {
          slug: slug,
          emailData: editedData,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      if (response) {
        editedTemplateSuccess();
        router.push("../email-templates");
      }
    } catch (error) {
      router.push("../email-templates");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <br></br>
      <br></br>
      <div className="flex justify-center items-center mt-5">
        <div className="p-5">
          <div className="flex justify-center items-center">
            <div className="text-3xl font-bold font-sans">Edit Template</div>
          </div>

          <div className="font-xl font-semibold mt-10 mb-5">
            <div className="text-xl">
              {emailTemplate?.et_title} Email Template
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subject :
            </div>

            <div>
              <input
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-black"
              />
            </div>
          </div>
          <div className="mt-4 text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Content :
          </div>
          <div className="App mt-3">
            <CKEditor
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              editor={ClassicEditor}
              data={emailTemplate?.et_content}
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              className="border mt-4 border-black py-2 px-4 rounded  text-sm font-medium font-sans"
              href={"../email-templates"}
            >
              Back
            </Link>
            <button
              className="border mt-4 border-black py-2 px-4 rounded  text-sm font-medium font-sans bg-black text-white"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
