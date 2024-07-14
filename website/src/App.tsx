import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Contact,
  Documentation,
  Features,
  Footer,
  Home,
  Marketing,
  ModalShow,
  Navbar,
  Result,
  Service,
  TryOnline,
  Tutorial,
} from "./components";
import { Login, Register, Verify } from "./components/Auth";
import { Profile, ProjectOpen } from "./components/User";
import { AuthProvider } from "./components/User/CheckAuth/AuthContext";

function App() {
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
            <Route path="/verify" element={<Verify />} />
            <Route path="/try-online" element={<TryOnline />} />
            {/* Protected */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/project" element={<ProjectOpen />} />

            <Route path="*" element={<Result type={404} />} />
          </Routes>
          <ModalShow />
          <Footer />
        </main>
        <Tutorial />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
