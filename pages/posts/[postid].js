import styles from "../custom.module.css";
import Head from "next/head";
import NextLink from "next/link";
import Nav from "../../src/components/Nav";
import Post from "../../src/components/Post";
import { Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Imports for backend
import connectMongo from "../../utils/connectMongo";
import User from "../../models/UserModel";

export default function PostPage({ posts }) {
  const router = useRouter();
  const { postid } = router.query;

  let selectedPost = "";
  let transformedPost = "";

  for (const post of posts) {
    if (postid === post._id) {
      selectedPost = post;
    }

    const transformedDate = new Date(selectedPost.date).toLocaleDateString(
      "en-us",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    transformedPost = {
      _id: selectedPost._id,
      author: selectedPost.author,
      date: transformedDate,
      title: selectedPost.title,
      body: selectedPost.body,
    };
  }

  if (selectedPost._id) {
    return (
      <>
        <Head>
          <title>Simple Blog - Post</title>
          <meta name="description" content="A Simple NextJS Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <Post post={transformedPost} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Simple Blog - Error</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div>
          <Heading as="h2">404 - Page Not Found!</Heading>
          <NextLink href="/" passHref>
            <Link>
              <Heading as="h3" size="md">
                Return to the home page
              </Heading>
            </Link>
          </NextLink>
        </div>
      </div>
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

    return {
      props: {
        posts: transformedPosts,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

// try {
//   await connectMongo();
//   const post = await User.findById(session.id);

//   console.log(post)

//   return {
//     props: {
//       post: JSON.parse(JSON.stringify(post)),
//     },
//   };
// } catch (error) {
//   return {
//     notFound: true,
//   };
// }
