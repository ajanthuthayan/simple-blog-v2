import Head from "next/head";
import Nav from "../src/components/Nav";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Simple Blog - Home</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      {isLoggedIn ? "Authenticated" : "Not Authenticated"}
      <main></main>

      <footer></footer>
    </>
  );
}
