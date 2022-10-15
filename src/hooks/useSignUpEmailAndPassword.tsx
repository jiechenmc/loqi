import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../App";

interface SignUpFields {
  email: string;
  password: string;
}

const useSignUpEmailAndPassword = ({
  email,
  password,
}: SignUpFields): boolean => {
  if (email == "" || password == "") return false;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
      return false;
    });
  return false;
};

export default useSignUpEmailAndPassword;
