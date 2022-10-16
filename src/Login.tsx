import { Dispatch, SetStateAction, useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./App";

interface LoginPageInterface {
  setLoginStatus: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setLoginStatus }: LoginPageInterface) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = () => {
    if (emailRef.current && passwordRef.current) {
      const em = emailRef.current.value;
      const pw = passwordRef.current.value;

      setEmail(em);
      setPassword(pw);

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoginStatus(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  };

  const handleSignIn = () => {
    if (emailRef.current && passwordRef.current) {
      const em = emailRef.current.value;
      const pw = passwordRef.current.value;

      setEmail(em);
      setPassword(pw);

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div id="firebaseui-auth-container">
      <form
        className="flex gap-1"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Email: </label>
        <input ref={emailRef} className="border-2" type="text"></input>
        <label>Password: </label>
        <input ref={passwordRef} className="border-2" type="text"></input>
        <button onClick={handleSignUp} className="border-2">
          Sign Up
        </button>
        <button onClick={handleSignIn} className="border-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
