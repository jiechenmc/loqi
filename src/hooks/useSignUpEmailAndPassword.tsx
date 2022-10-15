import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../App";

const useSignUpEmailAndPassword = (
  email: string,
  password: string
): boolean => {
  const [isSucessful, setIsSucessful] = useState(false);
  useEffect(() => {
    if (email !== "" || password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setIsSucessful(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ...
        });
    }
  }, [email, password]);

  return isSucessful;
};

export default useSignUpEmailAndPassword;
