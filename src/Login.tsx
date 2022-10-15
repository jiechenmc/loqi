import useEmailAndPassword from "./hooks/useSignUpEmailAndPassword";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useToxicityData from "./hooks/useToxicityData";

interface LoginPageInterface {
  setLoginStatus: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setLoginStatus }: LoginPageInterface) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  setLoginStatus(useEmailAndPassword(email, password));

  useToxicityData({ message: "fuck you" });
  const handleSignUp = () => {
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
      </form>
    </div>
  );
};

export default Login;
