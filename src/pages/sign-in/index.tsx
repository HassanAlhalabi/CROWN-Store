import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import SignInForm from "../../components/auth/sign-in";
import SignUpForm from "../../components/auth/sign-up";
import { auth, handleCreateUser } from "../../firebase";
import "./style.scss"

const SignIn = () => {
    
  return (
    <div className="auth-container mt-4 mb-4 d-flex justify-content-between">
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default SignIn
