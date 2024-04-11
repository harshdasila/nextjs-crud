export interface TokenData {
  id: number;
}

export interface AuthenticatedRequest extends Request {
  userId?: string; // or whatever type your userId is
}

export interface EmailInfo {
  email: string;
  mailType: string;
  data?: {
    name: string;
    // token?: string;
    password?: string;
  };
}