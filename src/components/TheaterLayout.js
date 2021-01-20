import React from "react";

export default function TheaterLayout(props) {
  console.log(props);

  const layout = props;

  const rankColor = ["#5fff5c", "#ff8ea6", "#a688ff"];

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
                  <td style={{ backgroundColor: "white" }}>{row}</td>
                  {seats.map((seat, i) => {
                    return !seat.status ? (
                      <td
                        key={i}
                        style={{
                          backgroundColor: rankColor[rank],
                          color: "black",
                        }}
                      >
                        {seat.number}
                      </td>
                    ) : (
                      <td
                        key={i}
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        {seat.status}
                      </td>
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
