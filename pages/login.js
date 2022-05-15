import React from "react";
import styles from "./custom.module.css";
import Head from "next/head";
import NextLink from "next/link";
import AuthForm from "../src/components/AuthForm";
import Nav from "../src/components/Nav";
import { Heading, Link } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>Simple Blog - Login</title>
          <meta name="description" content="A Simple NextJS Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <AuthForm />
      </>
    );
  } else if (isLoggedIn) {
    return (
      <>
        <Head>
          <title>Simple Blog - Logout</title>
          <meta name="description" content="A Simple NextJS Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <div className={styles.content}>
            <Heading as="h2">You are already signed in!</Heading>
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
}
