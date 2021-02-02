import React, { Children } from "react";
import Header from "./Header";
import Head from "next/head";
import { Container } from "semantic-ui-react";

export default (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
