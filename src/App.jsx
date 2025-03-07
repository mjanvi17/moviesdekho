import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import Error from "./Error";
import Navbar from "./Navbar"; // Import Navbar

function App() {
  return (
    <>
      <Navbar /> {/* Navbar stays on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
