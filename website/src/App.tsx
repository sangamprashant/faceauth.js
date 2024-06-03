import "./App.css";
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
} from "./components";

function App() {
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
}

export default App;
