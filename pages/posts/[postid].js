import Head from "next/head";
import Nav from "../../src/components/Nav";
import Post from "../../src/components/Post";

export default function PostPage() {
  return (
    <>
      <Head>
        <title>Simple Blog - Post</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Post />
    </>
  );
}
