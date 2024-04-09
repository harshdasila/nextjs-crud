"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { AllEmailTemplateData } from "@/interfaces/frontend";
import { EmailCard } from "@/components/email-card";
import Navbar from "@/components/navbar";
import redirectAuthorizedPath from "@/lib/unauthorized-redirect";

const EmailTemplates: React.FC = () => {
  const [emailTemplates, setEmailTemplates] = useState<AllEmailTemplateData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  console.log(emailTemplates);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/email-template/", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setLoading(false);
        setEmailTemplates(
          response.data.data.sort((a: any, b: any) => a.et_id - b.et_id)
        );
      })
      .catch((error) => {
        console.error("Error fetching email templates:", error);
        redirectAuthorizedPath(error.response.status)
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 mt-10">
        <div className="flex justify-center items-center p-5 m-3">
          <div className="text-3xl font-bold font-sans">Email Templates</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="p-4">
            {emailTemplates.map((template) => {
              return (
                <EmailCard
                  title={template.et_title}
                  slug={template.et_slug}
                  key={template.et_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplates;
