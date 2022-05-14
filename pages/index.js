import Head from "next/head";
import Nav from "../src/components/Nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple Blog - Home</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main></main>

      <footer></footer>
    </>
  );
}
