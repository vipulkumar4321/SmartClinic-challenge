// Home.js
import React from "react";

const homeStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "20vh",
  textAlign: "center",
};

function Home() {
  return (
    <div style={homeStyle}>
      <h1>Welcome to SmartClinic</h1>
    </div>
  );
}

export default Home;
