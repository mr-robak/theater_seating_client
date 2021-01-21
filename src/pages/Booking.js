import React, { useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../secrets/secrets";
import TheaterLayout from "../components/TheaterLayout";
import { store } from "../store/store";

export default function Booking() {
  const { state, dispatch } = useContext(store);

  console.log("state", state);

  useEffect(() => {
    axios
      .get(`${API_URL}/event-layout`)
      .then((res) => {
        dispatch({ type: "EVENT_FETCHED", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div>
      <TheaterLayout {...state.event} />
    </div>
  );
}
