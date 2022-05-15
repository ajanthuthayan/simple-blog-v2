import Head from "next/head";
import Nav from "../src/components/Nav";
import styles from "./custom.module.css";
import AddPostForm from "../src/components/AddPostForm";
import NextLink from "next/link";
import { Heading, Link } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function AddPost() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>Simple Blog - Add Post</title>
          <meta name="description" content="A Simple NextJS Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <div className={styles.content}>
            <Heading as="h2">You are not signed in!</Heading>
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
  } else if (isLoggedIn) {
    return (
      <>
        <Head>
          <title>Simple Blog - Add Post</title>
          <meta name="description" content="A Simple NextJS Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <AddPostForm />
      </>
    );
  }
}
