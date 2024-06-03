import {
  Access,
  Contact,
  Features,
  Footer,
  Hero,
  Marketing,
  Navbar,
  Service,
  Tutorial,
} from "@/components";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <main className="main" id="top">
        <Navbar />
        <Hero />
        <Service />
        <Access />
        <Features />
        <Contact />
        <Marketing />
        <Footer />
      </main>
      <Tutorial />
    </>
  );
};

export default Home;
