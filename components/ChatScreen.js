import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import firebase from "firebase";
import Message from "../components/Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import SendIcon from '@material-ui/icons/Send';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  
 const checkInput = () => {
   if(userEnteredValue.trim() != 0 && !input){ //if the user value isn't only spaces
    setBtnDisabled(false) //active the add button
  }else{
    setBtnDisabled(true)
  }
 }

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const sendMessage = (e) => {
    e.preventDefault();
 db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true })    

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <UserAvatar src={recipient?.photoURL} />
        ) : (
          <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          <p>
            {recipientSnapshot ? (
              <p>
                Last active:{" "}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : (
                  "Unavailable"
                )}
              </p>
            ) : (
              <p>Loading Last Active</p>
            )}
          </p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndofMessage />
      </MessageContainer>
      <InputContainer>
        <Input
          autoFocus={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={checkInput}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
<IconButton disabled={!input}>
        <SendIcon onClick={sendMessage} /></IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  height: 90vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style {
    display: none;
  }
  scrollbar-width: none;
`;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  top: 0;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const EndofMessage = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 20px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  outline: 0;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
  border: 0px;
  font-size: 18px;
`;
const UserAvatar = styled(Avatar)``;
