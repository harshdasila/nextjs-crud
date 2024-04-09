import { removeAuthToken } from "@/services/frontend/storage.service";

export default function redirectAuthorizedPath(statusCode: number) {
  if (statusCode && statusCode === 401) {
    removeAuthToken()
    window.location.href = "/login";
  }
}
