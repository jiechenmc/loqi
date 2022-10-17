import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: "stonybrook.edu" });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setLoginStatus(true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
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
    <div id="auth-container">
      <form
        className="flex gap-2 mt-2"
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
        <select className="border-2 border-red-500">
          <option>Stony Brook University</option>
        </select>
        <button
          onClick={handleGoogleAuth}
          className="border-2 border-green-200"
        >
          Google
        </button>
      </form>
    </div>
  );
};

export default Login;
