import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Contact,
  Documentation,
  Features,
  Footer,
  Home,
  Marketing,
  Navbar,
  Result,
  Service,
  Tutorial,
} from "./components";
import { Login, Register } from "./components/Auth";
import { Profile } from "./components/User";
import { AuthProvider } from "./components/User/CheckAuth/AuthContext";

function App() {
  // const token = import.meta.env.VITE_JWT_SECRET;

  return (
    <BrowserRouter>
      <AuthProvider>
        <main className="main" id="top">
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/services" element={<Service />} />
            <Route path="/features" element={<Features />} />
            <Route path="/superhero" element={<Contact />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/get-started" element={<Register />} />
            <Route path="/documentation" element={<Documentation />} />
            {/* Protected */}
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<Result type={404} />} />
          </Routes>
          <Footer />
        </main>
        <Tutorial />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
