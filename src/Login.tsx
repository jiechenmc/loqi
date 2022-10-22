import { useRef } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./App";

const Login = ({ setLoginStatus }: LoginPageInterface) => {
  let uni: { [key: string]: UniversitySettings } = {
    "Stony Brook University": { hd: "stonybrook.edu", colors: "" },
    "Binghamton University": { hd: "binghamton.edu", colors: "" },
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const uniRef = useRef<HTMLSelectElement>(null);

  const handleSignUp = () => {
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

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

      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    if (uniRef.current) {
      const hd = uni[uniRef.current.value].hd;
      provider.setCustomParameters({ hd: hd });
    }
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
          Impersonate
        </button>

        <select ref={uniRef} className="border-2 border-red-500">
          {Object.keys(uni).map((e) => {
            return <option key={e}>{e}</option>;
          })}
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
