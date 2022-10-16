import { database, auth } from "./App";
import { ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";

interface ToxicityResponse {
  source: string;
  toxicity: number;
}

interface Message {
  author: string;
  content: string;
}

const Home = () => {
  const [msgs, setMsgs] = useState<JSX.Element[]>();
  const [message, setMessage] = useState("");
  const [tox, setTox] = useState<ToxicityResponse>({
    source: "",
    toxicity: 0.0,
  });
  const inputEl = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputEl.current) {
      setMessage(inputEl.current.value);
    }
  };

  useEffect(() => {
    const messagesRef = ref(database, "global/messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        let tst = Object.values(data).map((e) => {
          let m = e as Message;
          return (
            <div key={uuidv4()}>
              {m.author} said: {m.content}
            </div>
          );
        });
        setMsgs(tst);
      }
    });
  }, []);

  useEffect(() => {
    fetch("/api/toxicity", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ message: message }),
    }).then((resp) => resp.json().then((d) => setTox(d)));
  }, [message]);

  useEffect(() => {
    if (tox.toxicity > 0.01) {
      alert(`Source: ${message}\nToxicity Rating: ${tox.toxicity}`);
    } else if (message !== "") {
      const messageID = uuidv4();
      let authorName = auth.currentUser?.email;
      set(ref(database, "global/messages/" + messageID), {
        content: message,
        author: authorName,
      });
    }
  }, [tox]);

  return (
    <div>
      <form
        id="messageForm"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="message">Message:</label>
        <input
          ref={inputEl}
          className="border"
          type="text"
          id="message"
          name="message"
        />
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </form>
      <div id="messageBox">{msgs}</div>
    </div>
  );
};

export default Home;
