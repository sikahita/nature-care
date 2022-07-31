import Home from "./pages/header";
import Checkout from "./pages/checkout";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/checkout" element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
