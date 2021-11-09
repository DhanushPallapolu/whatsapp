import { Circle } from "better-react-spinkit";
import styled from "styled-components"

function Loading() {
  const img = require('./spchat.png')
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Img
          src={img}
          alt="Loading"
          style={{ marginBottom: 10 }}
          height={200}
        />
      </div>
    </center>
  );
}

export default Loading;

const Img = styled.img``;
