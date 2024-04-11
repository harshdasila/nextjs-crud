import { getEmailTemplates } from "@/services/backend/email.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const emailTemplates = await getEmailTemplates();
  return NextResponse.json(
    {
      data: emailTemplates,
    },
    {
      status: 200,
    }
  );
}


