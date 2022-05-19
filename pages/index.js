import Head from "next/head";
import Nav from "../src/components/Nav";
import styles from "./index.module.css";
import PostPreview from "../src/components/PostPreview";

// Imports for backend
import connectMongo from "../utils/connectMongo";
import User from "../models/UserModel";
import { getSession } from "next-auth/react";

export default function Home({ posts, authPosts }) {
  let authPostIds = [];

  if (authPosts !== "") {
    for (const post of authPosts.posts) {
      authPostIds.push(post._id);
    }
  }

  return (
    <>
      <Head>
        <title>Simple Blog - Home</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main className={styles.container}>
        {posts &&
          posts.map((post) => {
            if (authPostIds.includes(post._id)) {
              return (
                <PostPreview
                  authorized={true}
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  body={post.body}
                />
              );
            } else {
              return (
                <PostPreview
                  authorized={false}
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  body={post.body}
                />
              );
            }
          })}
      </main>

      <footer></footer>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    await connectMongo();
    const dbPosts = await User.find({}, { posts: true, _id: false });
    const posts = JSON.parse(JSON.stringify(dbPosts));

    const transformedPosts = [];

    for (const userPosts of posts) {
      for (const post of userPosts.posts) {
        transformedPosts.push(post);
      }
    }

    let authPosts = "";

    if (await getSession(context)) {
      const session = await getSession(context);

      const dbAuthPosts = await User.findById(
        { _id: session.id },
        { posts: true, _id: false }
      );

      authPosts = JSON.parse(JSON.stringify(dbAuthPosts));
    }

    return {
      props: {
        posts: transformedPosts,
        authPosts: authPosts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
