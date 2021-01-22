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
  /* width: 100%;
  height: 100%; */
  /*background: #f5429e;
  background: linear-gradient(135deg, #f5429e 0%, #ff5852 50%, #ff6b52 100%); */
`;
const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  /* margin-top: 1em; */
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export default function AdminDashboard() {
  const { state, dispatch } = useContext(store);

  const [layout, setLayout] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/event-layout`)
      .then((res) => {
        console.log(res.data);
        setLayout(res.data);
        // dispatch({ type: "EVENT_FETCHED", payload: res.data });
        dispatch({
          type: "ALERT",
          payload: "Event data fetched successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <Root>
      <Container>
        <AdminPanel />
        <TheaterLayout data={layout} admin={true} />
      </Container>
    </Root>
  );
}
