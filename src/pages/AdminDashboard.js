import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../secrets/secrets";
import TheaterLayout from "../components/TheaterLayout";
import AdminPanel from "../components/AdminPanel";
import { store } from "../store/store";
import styled from "@emotion/styled";

const Root = styled.div`
  display: inline-block;
  justify-content: center;
  margin-top: 1em;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export default function AdminDashboard() {
  const { dispatch } = useContext(store);
  const [id, setId] = useState(1);
  const [layout, setLayout] = useState({});
  const [trigger, setTrigger] = useState(true);

  const selectEvent = (id) => {
    setId(id);
  };

  const triggerReload = () => {
    const newTrigger = trigger ? false : true;
    setTrigger(newTrigger);
    axios
      .get(`${API_URL}/event-layout/${id}`)
      .then((res) => {
        setLayout(res.data);
        dispatch({ type: "EVENT_FETCHED", payload: res.data });
        dispatch({
          type: "ALERT",
          payload: "Event data fetched successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/event-layout/${id}`)
      .then((res) => {
        setLayout(res.data);
        dispatch({ type: "EVENT_FETCHED", payload: res.data });
        dispatch({
          type: "ALERT",
          payload: "Event data fetched successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, dispatch, trigger]);

  return (
    <Root>
      <Container>
        <AdminPanel selectEvent={selectEvent} triggerReload={triggerReload} />
        <TheaterLayout data={layout} admin={true} />
      </Container>
    </Root>
  );
}
