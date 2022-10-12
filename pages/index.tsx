import type { NextPage } from "next";
import { database } from "../firebaseConfig";

interface ToxicityResponse {
  source: string;
  toxicity: number;
}

const Home: NextPage = () => {
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
        const src = document.createElement("p");
        const toxic = document.createElement("p");
        src.textContent = `Source: ${source}`;
        toxic.textContent = `Toxicity Rating: ${toxicity}`;
        msgForm.appendChild(src);
        msgForm.appendChild(toxic);
        if (toxicity > 0.01) {
          alert("Don't say that bro");
        }
      });
    });
  };
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
    </div>
  );
};

export default Home;
