"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { signin, signup } from "@/redux/slice/AuthSlice.ts";
import { Loader2 } from "lucide-react";
import { UserType } from "@/redux/slice/types/AuthTypes.ts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupUserType, setSignupUserType] = useState("user");
  const [message, setMessage] = useState({ type: "", content: "" });
  const navigate = useNavigate();
  // store state
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      signin({
        email: signinEmail,
        password: signinPassword,
      }),
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        setMessage({ type: "success", content: "Signin successful!" });
        navigate("/dashboard");
      } else {
        setMessage({
          type: "error",
          content: "Signin failed, Please try again.",
        });
      }
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setMessage({ type: "error", content: "Passwords do not match" });
      return;
    }
    // Here you would typically call your authentication service
    dispatch(
      signup({
        email: signupEmail,
        password: signupPassword,
        type: UserType.admin,
      }),
    );
    setMessage({ type: "success", content: "Signup successful!" });
  };

  return (
    <div className={"width-full h-screen flex items-center justify-center"}>
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Sign in or create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  {loading && <Loader2 className="animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>User Type</Label>
                    <RadioGroup
                      value={signupUserType}
                      onValueChange={setSignupUserType}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="signup-user" />
                        <Label htmlFor="signup-user">User</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="signup-admin" />
                        <Label htmlFor="signup-admin">Admin</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  {loading && <Loader2 className="animate-spin" />}
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {message.content && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="w-full"
            >
              <AlertDescription>{message.content}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
