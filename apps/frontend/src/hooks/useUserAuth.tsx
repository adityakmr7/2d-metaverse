import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { signin, signup } from "@/redux/slice/AuthSlice.ts";
import { UserType } from "@repo/utils/AuthTypes";
import { toast } from "react-hot-toast";

const useUserAuth = () => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSignin = async (email: string, password: string) => {
    try {
      const action = await dispatch(
        signin({
          email: email,
          password: password,
        }),
      );

      if (action.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Signin failed. Please try again.");
        setMessage({
          type: "error",
          content: "Signin failed. Please try again.",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setMessage({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const action = await dispatch(
        signup({
          email: email,
          password: password,
          type: UserType.admin,
        }),
      );

      if (action.meta.requestStatus === "fulfilled") {
        toast.success("Signup successful!");
        setMessage({ type: "success", content: "Signup successful!" });
      } else {
        toast.error("Signup failed. Please try again.");
        setMessage({
          type: "error",
          content: "Signup failed. Please try again.",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setMessage({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
  };

  return {
    handleSignin,
    handleSignup,
    setMessage,
    message,
    loading,
  };
};

export default useUserAuth;
