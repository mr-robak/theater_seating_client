import React from "react";
import TheaterLayout from "../components/TheaterLayout";

export default function Booking(props) {
  // console.log(props);
  return (
    <div>
      <TheaterLayout {...props} />
    </div>
  );
}
