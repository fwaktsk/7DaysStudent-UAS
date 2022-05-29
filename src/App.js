import Banner from "./components/Banner";
import SelectAvatar from "./components/SelectAvatar";
import {useState, useEffect} from "react";
import Home from "./components/Home"
import AboutUs from "./components/AboutUs";
import axios from "axios";

function App() {

  const [view,setView] = useState("setup");
  const [userData, setUserData] = useState({avatar:"", name:"", major:"", status: {hunger:75, ent: 75, rest: 75, study: 0}});
  const [acts, setActs] = useState(false);
  const [time, setTime] = useState({d:1, h:0, m:0});
  const [greet, setGreet] = useState("");
  const [weather, setWeather] = useState("");

  const playerSetup = (user) => {setUserData(user)}
  const updateMode = (mode) => {setView(mode)}
  const disableButton = (toggle) => {setActs(toggle)}
  const updateTime = (time) => {setTime(time)}
  const updateGreet = (text) => {setGreet(text)}

  const url =
    "api.openweathermap.org/data/2.5/forecast?lat=-6.256098&lon=106.618947&appid=7ca07ae2937263bad45b68abf9522fe3";

  useEffect(() => {
    axios.get(url).then((response) => {
      setWeather(response.list.weather.main);
    });
  });

  console.log(weather)

  function ViewMode()
  {
    if(view === "setup")
    {
      return <SelectAvatar
              dataFetch = {playerSetup}
              playMode = {updateMode}/>;
    }
    else if(view === "home")
    {
      return <Home
              data = {userData}
              playMode = {updateMode}
              dataFetch = {playerSetup}
              isBusy = {disableButton}
              changeTime = {updateTime}
              changeGreet = {updateGreet}
              busy = {acts}
              clock = {time}
              greeting = {greet}
              view = {view}/>;
    }
    else if(view === "credits")
    {
      return <AboutUs
              playMode = {updateMode}/>;
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

