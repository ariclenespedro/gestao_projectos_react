import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home/>} ></Route>
        <Route path="/company" exact element={ <Company/> } ></Route>
        <Route path="/newproject" exact element={<NewProject/>} ></Route>
      </Routes>
      <p>Footer</p>
    </Router>
  );
}

export default App;
