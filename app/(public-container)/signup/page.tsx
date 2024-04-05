"use client"
import Input from "@/components/input";
import Link from 'next/link';
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/error-message"
import { signUpSchema } from "@/schemas/frontend";
import { FormData } from "@/interfaces/frontend";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'

export default function Signup() {
    const router = useRouter()

  function incorrectCredentailsError() {
    toast.error("Email alredy registered!");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        console.log("Sign-up successful:", responseData);
        const jwtToken = responseData?.token;
        localStorage.setItem("jwtToken", jwtToken);
        router.push("/list-user");
      } else if(response.status===409) {
        console.error("User Already pressent", responseData);
        incorrectCredentailsError();
      }
      else{
        console.log("Internal server error")
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[430px] h-auto bg-white p-6 rounded-lg">
          <div className="text-center mb-3">
            <div className="font-sans text-4xl font-bold">Signup</div>
          </div>

          <Toaster richColors position="top-right" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter Your Name"
              type="text"
              name="name"
              register={register}
            />

            {errors.name && <ErrorMessage text={errors.name.message || ""} />}

            <Input
              label="Email"
              placeholder="harsh@example.com"
              type="text"
              name="email"
              register={register}
            />
            {errors.email && <ErrorMessage text={errors.email.message || ""} />}

            <Input
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              name="password"
              register={register}
            />
            {errors.password && (
              <ErrorMessage text={errors.password.message || ""} />
            )}

            <Input
              label="Confirm Password"
              placeholder="Confirm Your Password"
              type="password"
              name="cnfPassword"
              register={register}
            />
            {errors.cnfPassword && (
              <ErrorMessage text={errors.cnfPassword.message || ""} />
            )}

            <Input
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              type="text"
              register={register}
            />
            {errors.mobileNumber && (
              <ErrorMessage text={errors.mobileNumber.message || ""} />
            )}

            <p className="text-md text-gray-500">
              Already have an account?{" "}
              <Link className="underline" href={"/login"}>
                Signin
              </Link>
            </p>

            <Button text="Signup" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
