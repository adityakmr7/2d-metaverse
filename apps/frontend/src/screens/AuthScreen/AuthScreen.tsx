import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Button } from "@repo/ui/Button";
import useUserAuth from "@/hooks/useUserAuth.tsx";

function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { handleSignin, handleSignup } = useUserAuth();

  // onSignIn
  const onSignIn = (email: string, password: string) => {
    handleSignin(email, password);
  };

  const onSignUp = (_: string, email: string, password: string) => {
    handleSignup(email, password);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {isSignIn ? (
          <SignInForm onSignIn={onSignIn} />
        ) : (
          <SignUpForm onSignUp={onSignUp} />
        )}
        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn
              ? "Need an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
