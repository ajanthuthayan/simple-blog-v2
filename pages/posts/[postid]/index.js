import { useState } from "react";
import styles from "../../custom.module.css";
import Head from "next/head";
import NextLink from "next/link";
import Nav from "../../../src/components/Nav";
import Post from "../../../src/components/Post";
import { Box, Button, ButtonGroup, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Imports for backend
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/UserModel";
import { getSession } from "next-auth/react";

export default function PostPage({ posts, authPosts }) {
  const router = useRouter();
  const { postid } = router.query;

  let authPostIds = [];

  if (authPosts !== "") {
    for (const post of authPosts.posts) {
      authPostIds.push(post._id);
    }
  }

  let selectedPost = "";
  let transformedPost = "";
  let isAuthorized = false;

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

    isAuthorized = authPostIds.includes(selectedPost._id) ? true : false;

    transformedPost = {
      _id: selectedPost._id,
      author: selectedPost.author,
      date: transformedDate,
      title: selectedPost.title,
      body: selectedPost.body,
      authorized: isAuthorized,
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
    return {
      notFound: true,
    };
  }
};
