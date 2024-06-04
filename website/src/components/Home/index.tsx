import React from "react";
import Access from "../Access";
import Contact from "../Contact";
import Features from "../Features";
import Hero from "../Hero";
import Marketing from "../Marketing";
import Service from "../Service";
import Working from "../Working";

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Service />
      <Access />
      <Features />
      <Working />
      <Contact />
      <Marketing />
    </>
  );
};

export default Home;
