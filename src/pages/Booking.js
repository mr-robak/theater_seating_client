import React, { useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../secrets/secrets";
import TheaterLayout from "../components/TheaterLayout";
import OptionsPanel from "../components/OptionsPanel";
import { store } from "../store/store";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

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

export default function Booking() {
  const { state, dispatch } = useContext(store);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "CLEAR_SEAT" });
    axios
      .get(`${API_URL}/event-layout/${id * 1}`)
      .then((res) => {
        dispatch({ type: "EVENT_FETCHED", payload: res.data });
        dispatch({
          type: "ALERT",
          payload: "Event data fetched successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, id]);

  return (
    <Root>
      <Container>
        <OptionsPanel id={id} />
        <TheaterLayout data={state.event} />
        <MovieCard data={state.movieData[id - 1]} hideButton={true} />
      </Container>
    </Root>
  );
}
