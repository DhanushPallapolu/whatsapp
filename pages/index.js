import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spronklle Chat</title>
        <meta name="description" content="A all new 1:1 personal chatting, only with you email address! No phone number required!" />
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/whatsapp-sp.appspot.com/o/spchat.png?alt=media&token=be0717fb-54a5-4e4d-836f-3aefae34a5cb" />
      </Head>
      <Sidebar />
    </div>
  );
}
