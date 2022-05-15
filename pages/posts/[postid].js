import Head from "next/head";
import Nav from "../../src/components/Nav";
import Post from "../../src/components/Post";

export default function PostPage() {
  const post = {
    id: 1,
    author: "Ajanth Uthayan",
    date: "May 14, 2022",
    title: "Title",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  return (
    <>
      <Head>
        <title>Simple Blog - Post</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Post post={post} />
    </>
  );
}
