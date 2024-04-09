import { getTemplate, updateTemplate } from "@/services/backend/email.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const slug = await body.slug;
  const emailTemplate = await getTemplate(slug);
  if (emailTemplate) {
    return NextResponse.json(
      {
        message: "Successfully got the data.",
        data: emailTemplate,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "Email Template with the given slug not found.",
      },
      {
        status: 404,
      }
    );
  }
}
export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const slug = await body.slug;
  const emailData = body.emailData;
  console.log(emailData)
  console.log(slug,'ss')
  const updatedEmailTempalte = await updateTemplate(slug, emailData);
  if (updatedEmailTempalte) {
    return NextResponse.json({
      message: "Temaplate Updated Successfully",
      data: updatedEmailTempalte,
    },{
        status: 200
    });
  } else {
    return NextResponse.json({
      message: "Did not update the email template",
    },{
        status: 404
    });
  }
}
