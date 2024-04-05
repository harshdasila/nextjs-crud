export interface TokenData {
  id: number;
}

export interface AuthenticatedRequest extends Request {
  userId?: string; // or whatever type your userId is
}
