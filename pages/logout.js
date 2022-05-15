import Head from "next/head";
import styles from "./logout.module.css";
import NextLink from "next/link";
import { Heading, Link } from "@chakra-ui/react";
export default function Logout() {
  return (
    <>
      <Head>
        <title>Simple Blog - Logout</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <content>
          <Heading as="h2">You have been signed out!</Heading>
          <NextLink href="/" passHref>
            <Link>
              <Heading as="h3" size="md">
                Return to the home page
              </Heading>
            </Link>
          </NextLink>
        </content>
      </div>
    </>
  );
}
