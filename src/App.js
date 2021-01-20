import { useEffect, useState } from "react";
import axios from "axios";

import Booking from "./pages/Booking";

import { API_URL } from "./secrets/secrets";
import "./App.css";

function App() {
  const [theater, setTheater] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/event-layout`)
      .then((res) => {
        setTheater(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Booking {...theater} />
    </div>
  );
}

export default App;
