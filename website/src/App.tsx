import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Home, Navbar, Result, Tutorial } from "./components";
import { Login, Register } from "./components/Auth";

function App() {
  const token = import.meta.env.VITE_JWT_SECRET;

  console.log({ token });

  return (
    <BrowserRouter>
      <main className="main" id="top">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/get-started" element={<Register />} />
          <Route path="*" element={<Result type={404} />} />
        </Routes>
        <Footer />
      </main>
      <Tutorial />
    </BrowserRouter>
  );
}

export default App;
