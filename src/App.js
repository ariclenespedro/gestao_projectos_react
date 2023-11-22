import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Navbar from "./components/layouts/Navbar";


import Container from "./components/layouts/Container";




function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Container>
          <Route path="/" exact element={<Home/>} ></Route>
          <Route path="/company" exact element={ <Company/> } ></Route>
          <Route path="/newproject" exact element={<NewProject/>} ></Route>
        </Container>
      </Routes>
      <p>Footer</p>
    </Router>
  );
}

export default App;
