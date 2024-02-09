import Head from "next/head.js";

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Cook-Yeah!</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Navigation />
    </>
  );
}
