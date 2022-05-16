import Head from "next/head";
import Nav from "../src/components/Nav";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import PostPreview from "../src/components/PostPreview";

// Imports for backend
import connectMongo from "../utils/connectMongo";
import Post from "../models/postModel";

export default function Home({ posts }) {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <>
      <Head>
        <title>Simple Blog - Home</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main className={styles.container}>
        {isLoggedIn ? "Authenticated" : "Not Authenticated"}
        {posts &&
          posts.map((post) => (
            <PostPreview
              key={post._id}
              id={post._id}
              title={post.title}
              body={post.body}
            />
          ))}
      </main>

      <footer></footer>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    await connectMongo();
    const posts = await Post.find();
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
