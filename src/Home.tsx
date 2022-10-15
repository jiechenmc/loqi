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

  const handleSend = () => {
    const msgForm = document.getElementById("messageForm") as HTMLFormElement;
    const fd = new FormData(msgForm);

    const payload = JSON.stringify(Object.fromEntries(fd));

    fetch("/api/toxicity", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: payload,
    }).then((resp) => {
      resp.json().then(({ source, toxicity }: ToxicityResponse) => {
        if (toxicity > 0.01) {
          alert(`Source: ${source}\nToxicity Rating: ${toxicity}`);
        } else {
          const messageID = uuidv4();
          let authorName = auth.currentUser?.email;

          set(ref(database, "global/messages/" + messageID), {
            content: source,
            author: authorName,
          });
        }
      });
    });
  };

  const messagesRef = ref(database, "global/messages/");

  useEffect(() => {
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
        <input className="border" type="text" id="message" name="message" />
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </form>
      <div id="messageBox">{msgs}</div>
    </div>
  );
};

export default Home;
