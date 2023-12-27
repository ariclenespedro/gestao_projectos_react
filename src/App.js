import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Navbar from "./components/layouts/Navbar";
import Contact from "./components/pages/Contact";
import Footer from "./components/layouts/Footer";

import Container from "./components/layouts/Container";
import Projects from "./components/pages/Projects";


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/newproject" element={<NewProject />}/>
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/contacts" element={<Contact />} />
        </Routes>
      </Container>
      <Footer/>
      
    </Router>
  );
}

export default App;
