import Banner from "./components/Banner";
import SelectAvatar from "./components/SelectAvatar";
import {useState, useEffect} from "react";
import Home from "./components/Home"
import AboutUs from "./components/AboutUs";

function App(props) {

  const [view,setView] = useState("setup");
  const [userData, setUserData] = useState({avatar:"", name:"", major:"", status: {hunger:75, ent: 75, rest: 75, study: 0}});
  const [acts, setActs] = useState(false);
  const [time, setTime] = useState();
  const [greet, setGreet] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [weatherIdx, setWeatherIdx] = useState(0);
  const url =
    "http://api.openweathermap.org/data/2.5/forecast?lat=-6.256098&lon=106.618947&appid=7ca07ae2937263bad45b68abf9522fe3";

  const playerSetup = (user) => {setUserData(user)}
  const updateMode = (mode) => {setView(mode)}
  const disableButton = (toggle) => {setActs(toggle)}
  const updateGreet = (text) => {setGreet(text)}
  const updateWeatherData = (api) =>{setWeatherData(api);}
  const updateTime = (time) =>{setTime(time)}
  const updateWeather = () => {
    setWeatherIdx(weatherIdx+1);
    setWeather(weatherData.list[weatherIdx].weather[0].main);
    console.log(weatherIdx);
    console.log(weather);
  }

  useEffect(() => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => updateWeatherData(data))
  }, []);

  useEffect(() => {
    const clock = setInterval(function ()
    {
      if(view !== "setup" && view !== "credits")
      {
          var m = time.m + 1;
          var h = time.h;
          var d = time.d;
          if (m >= 60)
          {
            m -= 60;
            h += 1;
            if(h % 3 === 0)
            {
              updateWeather(weatherIdx);
              console.log(weather);
            }
          }
          if (h >= 24)
          {
            h -= 24;
            d += 1;
          }

          setTime({d:d, h:h, m:m});
        }
      }, 10);

    return () => {
      clearInterval(clock)
    };
  }, [time]);

  function ViewMode()
  {
    if(view === "setup")
    {
      return <SelectAvatar
              dataFetch = {playerSetup}
              playMode = {updateMode}
              timeStart = {updateTime}/>;
    }
    else if(view === "home")
    {
      return <Home
              data = {userData}
              busy = {acts}
              clock = {time}
              greeting = {greet}
              view = {view}
              weather = {weather}
              playMode = {updateMode}
              dataFetch = {playerSetup}
              isBusy = {disableButton}
              changeGreet = {updateGreet}
              changeWeather = {updateWeather}/>;
    }
    else if(view === "credits")
    {
      return <AboutUs
              playMode = {updateMode}/>;
    }
  }

  return (
    <div id="App">
      <Banner />
      <ViewMode />
      
    </div>
  );
}



export default App;


//

//lagi edit

//

