import "./App.css";
import Navbar from "./components/Navbar";
import ReadFile from "./components/ReadFile";
import StoT from "./components/StoT";
import StartClass from "./pages/StartClass";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import  LandingPage from "./pages/LandingPage";
import ProgressTracker from "./pages/ProgressTracker";
function App() {
  return (
    <BrowserRouter>
    <Routes>
<Route path="/" element={<LandingPage />} />
<Route path="/startClass" element={<StartClass />} />
<Route path="/progressTracker" element={<ProgressTracker />} /> 
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
