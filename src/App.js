import Banner from "./components/Banner";
import SelectAvatar from "./components/SelectAvatar";
import {useState} from "react";
import Home from "./components/Home"
import AboutUs from "./components/AboutUs";

function App() {

  const [view,setView] = useState("setup");
  const [userData, setUserData] = useState({avatar:"", name:"", major:"", status: {hunger:75, ent: 75, rest: 75, study: 0}});

  const playerSetup = (user) => {setUserData(user)}

  const updateMode = (mode) => {setView(mode)}

  function ViewMode()
  {
    if(view === "setup")
    {
      return <SelectAvatar dataFetch = {playerSetup} playMode = {updateMode}/>;
    }
    else if(view === "home")
    {
      return <Home data = {userData} playMode = {updateMode} dataFetch = {playerSetup}/>;
    }
    else if(view === "credits")
    {
      return <AboutUs playMode = {updateMode}/>;
    }
  }

  return (
    <div id="App">
      <Banner/>
      <ViewMode />
      
    </div>
  );
}



export default App;


//

//lagi edit

//

