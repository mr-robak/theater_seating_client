import React, { useContext } from "react";
import styled from "@emotion/styled";
import MovieCard from "../components/MovieCard";
import { store } from "../store/store";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: auto 1em;

  border-color: black;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Home = () => {
  const { state } = useContext(store);

  return (
    <StyledDiv>
      {state.movieData.map((movie, i) => (
        <MovieCard key={i} data={movie} />
      ))}
    </StyledDiv>
  );
};

export default Home;
