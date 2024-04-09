import * as jose from "jose";
import { redirect } from 'next/navigation';

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
  };
export default async function verifyToken(token: string){
    if (token) {
        try {
          const decoded = await jose.jwtVerify(token, jwtConfig.secret);
    
          if (decoded.payload?.id) {
            return true;
          } else {
            return redirect('/login')
          }
        } catch (err) {
          console.error("isAuthenticated error: ", err);
    
          return false;
        }
      }
}