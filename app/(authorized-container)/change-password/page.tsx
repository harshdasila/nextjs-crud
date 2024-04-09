"use client";
import Input from "@/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/error-message";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { changePasswordSchema } from "@/schemas/frontend";
import { ChangePassword } from "@/interfaces/frontend";
import Button from "@/components/button";
import { useUserContext } from "@/contexts/userContext";
import axios from "axios";

export default function changePassword() {
  function showWrongPassword(){
    toast.error("Incorrect Old Password!");
  }
  function showSuccessMessage(){
    toast.success("Password Changed Successfully!");
  }
  const { user, setUser } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
  });
  const router = useRouter();

  const onSubmit = async(data: any) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/change-password",{
      id: user.id,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });
    if(response){
      showSuccessMessage();
      router.push('/list-user')
    }
    } catch (error:any) {
      if(error.response.status===400){
        showWrongPassword();
      }
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
      <div className="w-[430px] h-auto bg-white p-6 rounded-lg">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold">Change Password</h1>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="old password"
              name="oldPassword"
              register={register}
              label="Old Password"
              type="password"
            />
            {errors.oldPassword && <ErrorMessage text={errors.oldPassword.message || ""} />}
            <Input
              placeholder="new password"
              name="newPassword"
              register={register}
              label="New Password"
              type="password"
            />
            {errors.newPassword && <ErrorMessage text={errors.newPassword.message || ""} />}
            <Input
              placeholder="confirm password"
              name="cnfNewPassword"
              register={register}
              label="Confirm New Password"
              type="password"
            />
             {errors.cnfNewPassword && <ErrorMessage text={errors.cnfNewPassword.message || ""} />}
             <Button text="Submit" type="submit" />
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
