import React from "react";
import "./styles.css";
import { Bars1 } from "react18-loaders/dist/server";
import { LoaderContainer } from "react18-loaders";
import { LandingPage, Layout } from "@repo/shared/dist/server";
import { Core } from "nextjs-darkmode";
import { Demo, Header } from "@repo/shared";

/** Vite App */
function App(): JSX.Element {
  return (
    <Layout>
      <Core t="background .5s" />
      <Header />
      <LandingPage title="Vite Example">
        <Demo />
      </LandingPage>
      <LoaderContainer>
        <Bars1 color="red" width={50} />
      </LoaderContainer>
    </Layout>
  );
}

export default App;
