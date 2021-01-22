import React, { useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../secrets/secrets";
import TheaterLayout from "../components/TheaterLayout";
import OptionsPanel from "../components/OptionsPanel";
import { store } from "../store/store";
import styled from "@emotion/styled";

const Root = styled.div`
  display: inline-block;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  /* margin-top: 1em; */
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export default function Booking() {
  const { state, dispatch } = useContext(store);

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
    <Root>
      <Container>
        <OptionsPanel />
        <TheaterLayout {...state.event} />
      </Container>
    </Root>
  );
}
