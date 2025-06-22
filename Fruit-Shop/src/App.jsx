import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ApiData from "./pages/ApiData";
import { ThemeProvider } from "./context/ThemeContext";
import Fruits from  "./pages/Fruits";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api" element={<ApiData />} />
            <Route path="/fruits" element={<Fruits/>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}