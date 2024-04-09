import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TokenData } from "./interfaces/backend/token.interface";
import { isAuthenticated } from "./lib/jwt-token-control";

export async function middleware(req: NextRequest, res: NextResponse) {

  const result = await isAuthenticated(req);
  if (!result) {
    return Response.json({ success: false, message: 'Invalid token. Paths starting with `/api/v1/`' }, { status: 401 })
  }
  else {
    return NextResponse.next();
  }

}

export const config = {
  matcher: ['/api/v1/email-template','/api/v1/email-template/edit', '/api/v1/user/list', '/api/v1/user/update/:id*'],
};
