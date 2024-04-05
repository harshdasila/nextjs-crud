export const getAuthToken = () => {
  return localStorage.getItem("jwtToken") ?? "";
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("jwtToken", token);
};

export const removeAuthToken = () => {
    localStorage.removeItem("jwtToken")
};
