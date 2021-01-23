import React from "react";
import styled from "@emotion/styled";
import MovieCard from "../components/MovieCard";

const StyledDiv = styled.div`
  /* display: inline-block; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: auto 1em;
  /* width: 300px; */

  border-color: black;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Home = () => {
  return (
    <StyledDiv>
      {data.map((movie, i) => (
        <MovieCard key={i} data={movie} />
      ))}
    </StyledDiv>
  );
};

export default Home;

const data = [
  {
    id: 1,
    image: "blade.jpg",
    title: "Blade Runner",
    year: "1982",
    description:
      "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
  },
  {
    id: 3,
    image: "starwars.jpg",
    title: "Star Wars - A New Hope",
    year: 1977,
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
  },
  {
    id: 2,
    image: "alien.jpg",
    title: "Alien",
    year: 1979,
    description:
      "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form.",
  },
];
