import { InputHTMLAttributes } from "react";
import { signInSchema } from '@/schemas/frontend'
import { z } from "zod";
import { UseFormRegister } from "react-hook-form";

export type SignInData = z.infer<typeof signInSchema>;

export interface FormData {
  cnfNewPassword: string;
  email: string;
  name: string;
  mobileNumber: string;
  password: string;
  cnfPassword: string;
}

export interface AddUserData {
  email: string;
  name: string;
  mobileNumber: string;
  password: string;
  cnfPassword: string;
  roleId: number;
}

export interface ButtonProps {
  text: string;
  type: string;
}

export interface ErrorMessageProps {
  text: string;
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  register: UseFormRegister<any>;
}

export interface SearchInputProps {
  sortBy: string;
  sortOrder: string
  setUserData: any,
  input: string,
  setInput: any,
  recordsPerPage: number,
  page: number,
  setPage: any,
  setTotalUsers: any
}

export interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  // address: {
  //   street: string;
  // };
  user_number: string;
  user_created_at: string;
  um_roles: any
}

export interface UserListProps {
  userr: User;
  handleDelete: (id: number) => void;
}

export interface UserData {
  user_id: number
  user_name:string
  user_email: string
  user_password: string
  user_number: string
  user_created_at: string
  user_updated_at: string
  user_deleted_at: string
}

export interface useUserInterface {
  setUserData:any
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserDetailsInterface {
  user_name: string,
  user_email: string,
  user_number: string,
}

export interface PaginationProps {
  pageProp: number;
  goAhead: () => void;
  goBack: () => void;
  page : number
  totalPages: number
}

export interface EditedUserData {
  user_name: string,
  user_email: string,
  user_number: string,
}

export interface EditFormData {
  name: string,
  email: string,
  number: string,
  roleId: number
}

export interface AllEmailTemplateData {
  et_id: string,
  et_slug: string,
  et_title: string
}

export interface EmailTemplateData {
  et_id: string,
  et_slug: string,
  et_title: string,
  et_content: string,
  et_subject: string,
}

export interface UserStateData {
  id?: number,
  role_id?: number
}

export interface UserStateDataTwo{
  user_email: string,
  user_id: number,
  user_role_id: number
}

export interface ChangePassword{
  oldPassword: string,
  newPassword: string,
  cnfNewPassword: string
}