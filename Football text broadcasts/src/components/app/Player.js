import React from "react";

const Player = ({ value }) => (
  <tr>
    <td>{value.position}</td>
    <td>{value.number}</td>
    <td>{value.name}</td>
  </tr>
);

export default Player;