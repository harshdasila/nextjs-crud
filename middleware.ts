// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { TokenData } from "./interfaces/backend/token.interface";
// import { isAuthenticated } from "./lib/jwt-token-control";

// export async function middleware(req: NextRequest, res: NextResponse) {
//   // const user = await getDataFromPrisma();

//   // console.log(user, "from prisma");
//   const result = await isAuthenticated(req);
//   if (!result) {
//     return Response.json(
//       { success: false, message: "Unauthorized User`" },
//       { status: 401 }
//     );
//   } else {
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: [
//     "/api/v1/email-template",
//     "/api/v1/me",
//     "/api/v1/change-password",
//     "/api/v1/email-template/edit",
//     "/api/v1/user/list",
//     "/api/v1/user/update/:id*",
//     "/api/v1/super-admin",
//     "/api/v1/user/",
//     "/api/v1/settings",
//   ],
// };

import { NextRequest, NextResponse } from 'next/server'

export const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, {headers: corsHeaders})
  }

  response.headers.append("Access-Control-Allow-Origin", corsHeaders['Access-Control-Allow-Origin'])
  response.headers.append("Access-Control-Allow-Methods", corsHeaders['Access-Control-Allow-Methods'])
  response.headers.append("Access-Control-Allow-Headers", corsHeaders['Access-Control-Allow-Headers'])
  
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
}