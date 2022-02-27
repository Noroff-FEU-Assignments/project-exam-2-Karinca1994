import React from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/Homepage/Hero.js";
import { META_HOME, KEY_HOME, TITLE_HOME } from "../constants/meta";
import Types from "../components/Homepage/Types";
import Quoutes from "../components/Homepage/Quoutes";

export default function home() {
  return (
    <Layout
      page="home"
      title={TITLE_HOME}
      keywords={KEY_HOME}
      description={META_HOME}
    >
      <div className="home-background-image ">
        <Hero />
        <Types />
        <Quoutes />
        <div className="py-5"> </div>
      </div>
    </Layout>
  );
}
