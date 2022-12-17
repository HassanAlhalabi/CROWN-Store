import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth, handleCreateGoogleUser, loginWithGoogleRedirect } from "../../firebase"

const SignIn = () => {

    useEffect(() =>  {
        (async () => {
            const userData = await getRedirectResult(auth);
            if(userData) {
                const user = {
                    uid: userData.user.uid,
                    displayName: userData.user.displayName,
                    email: userData.user.email 
                }
                // Handle Add User To DB
                const userDocument = await handleCreateGoogleUser(user);
                console.log(userDocument);
            }
        })()
    },[])
    
  return (
    <>
      Sign in With Google
      <button onClick={loginWithGoogleRedirect}>Sign In</button>
    </>
  )
}

export default SignIn
