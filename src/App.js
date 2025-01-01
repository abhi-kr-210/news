import {BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Homes from "./Pages/Homes";
function App() {
  return (
    <BrowserRouter>

    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/signupuser" element={<Signup />} />
    <Route path="/home" element={<Homes />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
