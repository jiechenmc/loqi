import { database, auth } from "./App";
import { ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import RoomCard from "./RoomCard";

const Home = () => {
  const uniLookUp: { [key: string]: string } = {
    "stonybrook.edu": "Stony Brook University",
    "binghamton.edu": "Binghamton University",
  };

  const currUser = auth.currentUser!;
  console.log(currUser);

  const domain: string = currUser.email?.match(/\w+.edu/gm)?.toString()!;
  const university = uniLookUp[domain];

  const [rooms, setRooms] = useState<JSX.Element[]>();
  const [message, setMessage] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputEl.current) {
      setMessage(inputEl.current.value);
    }
  };

  useEffect(() => {
    const messagesRef = ref(database, `${university}/rooms/`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data != null) {
        let tst = Object.entries(data).map((e) => {
          const res = e as unknown as any;
          const resp = { roomID: res[0], ...res[1] } as Room;

          return <RoomCard key={uuidv4()} {...resp} />;
        });
        setRooms(tst);
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
      <div className="my-5 p-2 border">
        <div>User name: {currUser.displayName}</div>
        <img
          src={currUser.photoURL !== null ? currUser.photoURL : "#"}
          alt="User Profile Picture"
        ></img>
        <div>University: {university}</div>
      </div>

      <div id="messageBox">{rooms}</div>
    </div>
  );
};

export default Home;
