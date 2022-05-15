import Head from "next/head";
import styles from "./custom.module.css";
import NextLink from "next/link";
import { Heading, Link } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Simple Blog - Logout</title>
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
