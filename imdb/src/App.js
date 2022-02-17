import Banner from './component/Banner';
import NavBar from './component/NavBar';
import Movies from "./component/Movies";
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Fav from "../src/component/Fav";
import Footer from './component/Footer';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<>
        <Banner/>
        <Movies/>
      </>}/>
      <Route path="/Fav" element={<Fav/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
