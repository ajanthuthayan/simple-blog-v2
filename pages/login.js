import React from "react";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import Nav from "../src/components/Nav";
import AuthForm from "../src/components/AuthForm";

export default function Login() {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Head>
          <title>Login Page</title>
        </Head>
        <div className={styles.content}>
          <AuthForm />
        </div>
      </div>
    </>
  );
}
