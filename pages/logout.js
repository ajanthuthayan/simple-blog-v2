import Head from "next/head";
import styles from "./custom.module.css";
import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../src/app/auth-slice";
import { useEffect } from "react";

export default function Logout() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.clear(), dispatch(logout());
  });

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
          <Link onClick={() => router.push("/")}>
            <Heading as="h3" size="md">
              Return to the home page
            </Heading>
          </Link>
        </content>
      </div>
    </>
  );
}
