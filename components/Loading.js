import { Circle } from "better-react-spinkit";
import styled from "styled-components"

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Img
          src="https://firebasestorage.googleapis.com/v0/b/whatsapp-sp.appspot.com/o/spchat.png?alt=media&token=be0717fb-54a5-4e4d-836f-3aefae34a5cb"
          alt="Loading"
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color="#0094FF" size={60} />
      </div>
    </center>
  );
}

export default Loading;

const Img = styled.img``;
