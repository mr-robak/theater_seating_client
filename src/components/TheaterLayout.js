import React from "react";
import styled from "@emotion/styled";

const TD = styled.td`
  height: 1.8em;
  width: 1.5em;
  border: none;
  border-radius: 11px 11px 0 0;
  :hover {
    background-color: yellow;
    color: #ffff;
  }
`;

export default function TheaterLayout(props) {
  const layout = props;

  const rankColor = ["#5fff7c", "#ff8ea6", "#a688ff"];
  const bookedColor = "#000000";

  const renderLayout = (layout) => {
    const sections = Object.keys(layout);
    //   console.log("sectionsList", sectionsList);
    return sections.map((sectionNr, i) => {
      const section = layout[sectionNr];
      //   console.log("section", section);
      const rows = Object.keys(section.rows);
      return (
        <table key={i}>
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
                    return !seat.status ? (
                      <TD
                        key={i}
                        style={{
                          backgroundColor: rankColor[rank],
                          color: "white",
                        }}
                      >
                        {seat.number}
                      </TD>
                    ) : (
                      <TD
                        key={i}
                        style={{
                          backgroundColor: { bookedColor },
                          color: "white",
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
        </table>
      );
    });
  };

  return <div>{renderLayout(layout)}</div>;
}
