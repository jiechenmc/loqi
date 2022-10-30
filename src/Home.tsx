import { database, auth } from "./App";
import { ref, set, onValue } from "firebase/database";
import { signOut } from "firebase/auth";
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
    auth
      .signOut()
      .then(() => {
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // fetch room meta data
  useEffect(() => {
    const messagesRef = ref(database, `meta/universities/rooms/${university}/`);
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
      <div className="absolute right-0">
        <button className="relative right-0" type="button" onClick={handleSend}>
          Sign Out
        </button>
      </div>
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
