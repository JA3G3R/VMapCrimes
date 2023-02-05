import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import {
  BrowserRouter,  Routes,  Route} from "react-router-dom";
import Single from "./Pages/single/Single";
import New from "./Pages/new/New";
import List from "./Pages/list/List";
import Location from "./Pages/location/Location";
import Fir from "./Pages/fir/Fir";
import { productInputs, userInputs } from "./formSource";
import Roles from "./Pages/roles/Roles";
import Newroles from "./Pages/newroles/Newroles";
import "./style/dark.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";


function App() {
  const{darkMode} = useContext(DarkModeContext)
  return (
    <div className={ darkMode ? "app dark": "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login/>} />
            <Route path="location" element={<Location/>} />
            <Route path="fir" element={<Fir/>} />
            <Route path="roles" element={<Roles/>} />
            <Route path="newroles" element={<Newroles/>} />
            <Route path="users">
              <Route index element={<List/>}/>
              <Route path=":userId" index element={<Single/>}/>
              <Route path="new" element={<New inputs={userInputs} title="Add New User"/>}/>
            </Route>
            <Route path="products">
              <Route index element={<List/>}/>
              <Route path=":productId" index element={<Single/>}/>
              <Route path="new" element={<New inputs={productInputs} title="Add New Product"/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
