import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./Room";

const firebaseConfig = {
  apiKey: "AIzaSyA2ffbETwL8hupSveo6d55YTOun0kYzCC4",
  authDomain: "loqi-loqi.firebaseapp.com",
  databaseURL: "https://loqi-loqi-default-rtdb.firebaseio.com",
  projectId: "loqi-loqi",
  storageBucket: "loqi-loqi.appspot.com",
  messagingSenderId: "622541820845",
  appId: "1:622541820845:web:e7b417188f959ea1c40724",
  measurementId: "G-HZDJC6PYH8",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Home /> : <Login setLoginStatus={setIsLoggedIn} />
            }
          ></Route>
          <Route path="/rooms/:id" element={<Room />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
