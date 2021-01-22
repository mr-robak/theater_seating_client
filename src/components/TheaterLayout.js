import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { store } from "../store/store";

const Container = styled.div`
  /* display: inline-block; */
  justify-content: center;
  margin-top: 1em;
  padding: 1em 1.4em 1em 1em;
  border-radius: 5px;
  box-shadow: 2px 1px 11px 0px rgba(0, 0, 0, 0.35);
`;
const Table = styled.table`
  margin-top: 0.7em;
`;

const TD = styled.td`
  height: 1.8em;
  min-width: 1.5em;
  border-radius: 13px 13px 0 0;
`;
const Legend = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.7em;

  span {
    margin-left: 0.6em;
    margin-right: 0.8em;
    font-size: 0.7em;
    font-style: italic;
  }
`;
const Rank = styled.div`
  height: 1.1em;
  width: 0.9em;
  border-radius: 13px 13px 0 0;
`;

export default function TheaterLayout(props) {
  const data = props.data;
  const [layout, setLayout] = useState(data);
  // console.log("layout", layout);
  // console.log("data", data);

  const { dispatch } = useContext(store);

  const rankColor = ["#5fff7c", "#ff8ea6", "#a688ff"];
  const bookedColor = "#5e5d5d";

  const seatSelect = (seat) => dispatch({ type: "SEAT_SELECT", payload: seat });

  useEffect(() => {
    const data = props.data;
    setLayout(data);
  }, [props.data]);

  const renderLayout = (layout) => {
    const sections = Object.keys(layout);
    //   console.log("sectionsList", sectionsList);
    return sections.map((sectionNr, i) => {
      const section = layout[sectionNr];
      //   console.log("section", section);
      const rows = Object.keys(section.rows);
      return (
        <Table key={i}>
          <thead>
            <tr>
              <th colSpan="9">{layout[sectionNr].name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              //   console.log(section[row]);
              const rank = section.rows[row].rank - 1;
              const seats = section.rows[row].seats;
              //   console.log(rankColor[rank]);
              return (
                <tr key={i} style={{ backgroundColor: rankColor[rank] }}>
                  <TD style={{ backgroundColor: "white" }}>{row}</TD>
                  {seats.map((seat, i) => {
                    const currentSeat = {
                      section: (sectionNr *= 1),
                      row: (row *= 1),
                      seat: (seat.number *= 1),
                    };
                    return seat.status === null ? (
                      <TD
                        onClick={
                          props.admin
                            ? () => {
                                layout[sectionNr].rows[row].seats[i].status =
                                  seat.status === "B" ? null : "B";
                                setLayout({ ...layout });
                                seatSelect(currentSeat);
                              }
                            : null
                        }
                        key={i}
                        style={{
                          backgroundColor: rankColor[rank],
                          color: "white",
                          cursor: props.admin ? "pointer" : null,
                        }}
                      >
                        {seat.number}
                      </TD>
                    ) : (
                      <TD
                        onClick={
                          props.admin
                            ? () => {
                                layout[sectionNr].rows[row].seats[i].status =
                                  seat.status === "B" ? null : "B";
                                setLayout({ ...layout });
                                seatSelect(currentSeat);
                              }
                            : null
                        }
                        key={i}
                        style={{
                          backgroundColor: bookedColor,
                          color: "white",
                          cursor: props.admin ? "pointer" : null,
                        }}
                      >
                        {seat.status}
                      </TD>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    });
  };

  return (
    <Container>
      {renderLayout(layout)}
      <Container
        style={{
          margin: "1.5em",
          padding: "0em 0.5em 1.2em 0.5em",
          border: "2px dotted #BFBFBF",
          // borderStyle: "dashed",
          // borderWidth: "1px",
          boxShadow: "none",
        }}
      >
        <p>Legend:</p>
        <Legend>
          <Rank
            style={{
              backgroundColor: rankColor[0],
              color: "white",
            }}
          />
          <span>Rank 1</span>
          <Rank
            style={{
              backgroundColor: rankColor[1],
              color: "white",
            }}
          />
          <span>Rank 2</span>
          <Rank
            style={{
              backgroundColor: rankColor[2],
              color: "white",
            }}
          />
          <span>Rank 3</span>
        </Legend>

        <Legend
          style={{
            alignItems: "flex-start center ",
            marginTop: "0.8em",
          }}
        >
          <Rank
            style={{
              backgroundColor: bookedColor,
              color: "white",
            }}
          />
          <span>Seat booked</span>
          <Rank
            style={{
              backgroundColor: bookedColor,
              color: "white",
            }}
          >
            B
          </Rank>
          <span>Blocked</span>
        </Legend>
      </Container>
    </Container>
  );
}
