import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import AuthForm from "../src/components/AuthForm";
import Nav from "../src/components/Nav";


export default function Login() {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <Nav />
      {/* <AuthForm /> */}
    </>
  );
}
