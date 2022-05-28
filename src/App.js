import Banner from "./components/Banner";
import SelectAvatar from "./components/SelectAvatar";
import {useState} from "react";
import Home from "./components/Home"
import AboutUs from "./components/AboutUs";

function App() {

  const [view,setView] = useState("aboutUs");
  const [userData, setUserData] = useState({avatar:"", name:"", major:""});

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
      return <Home data = {userData} playMode = {updateMode}/>;
    }
    else if(view === "aboutUs")
    {
      return <AboutUs />;
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

