import Banner from "./components/Banner";
import SelectAvatar from "./components/SelectAvatar";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Campus from "./components/Campus";
import Cafe from "./components/Cafe";
import Park from "./components/Park";
import Theater from "./components/Theater.jsx";
import AboutUs from "./components/AboutUs";

function App(props) {
  const [view, setView] = useState("setup");
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    major: "",
    status: { hunger: 75, ent: 75, rest: 75, study: 0 },
  });
  const [acts, setActs] = useState(false);
  const [time, setTime] = useState();
  const [greet, setGreet] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [news, setNews] = useState("");
  const [newsData, setNewsData] = useState();
  const [newsIdx, setNewsIdx] = useState(0);
  const [weatherIdx, setWeatherIdx] = useState(0);
  const urlWeather =
    "http://api.openweathermap.org/data/2.5/forecast?lat=-6.256098&lon=106.618947&appid=7ca07ae2937263bad45b68abf9522fe3";
  const urlNews =
    "https://newsapi.org/v2/everything?q=Anime&from=2022-06-01&sortBy=popularity&apiKey=1f8ba25103ce4242b90180848154fdd1";

  const playerSetup = (user) => {
    setUserData(user);
  };
  const updateMode = (mode) => {
    setView(mode);
  };
  const disableButton = (toggle) => {
    setActs(toggle);
  };
  const updateGreet = (text) => {
    setGreet(text);
  };
  const updateTime = (time) => {
    setTime(time);
  };
  const updateWeather = () => {
    setWeatherIdx(weatherIdx + 1);
    setWeather(weatherData[weatherIdx].weather[0].main);
  };

  const updateNews = () => {
    setNewsIdx(Math.floor(Math.random() * 19));
    // console.log(newsIdx);
    // console.log(news);
    const pickedNews = newsData[newsIdx];
    setNews({
        author: pickedNews.author,
        title: pickedNews.title,
        image: pickedNews.urlToImage,
        readMore: pickedNews.url,
        desc: pickedNews.description,
      });
  };

  useEffect(() => {
    fetch(urlWeather)
      .then((response) => response.json())
      .then((data) => setWeatherData(data.list));

    fetch(urlNews)
      .then((response) => response.json())
      .then((data) => setNewsData(data.articles))
      // .then(console.log(newsData));
  }, []);

  useEffect(() => {
    const clock = setInterval(function () {
      if (view !== "setup" && view !== "credits" && view !== "gameOver") {
        var m = time.m + 1;
        var h = time.h;
        var d = time.d;
        if (m >= 60) {
          m -= 60;
          h += 1;
          if (h % 5 === 0) {
            updateWeather();
          }
        }
        if (h >= 24) {
          h -= 24;
          d += 1;
        }
        setTime({ d: d, h: h, m: m });

        if (m % 10 === 0) {
          updateNews();
          var stats = userData.status;
          stats.hunger -= 1;
          stats.ent -= 1;
          stats.rest -= 2;
          playerSetup({ ...userData, status: stats });
        }

        if (time.h >= 6 && time.h <= 10) {
          updateGreet("Good Morning");
        } else if (time.h > 10 && time.h <= 15) {
          updateGreet("Good Day");
        } else if (time.h > 15 && time.h <= 18) {
          updateGreet("Good Afternoon");
        } else if (time.h > 18 && time.h <= 21) {
          updateGreet("Good Evening");
        } else if ((time.h > 21 && time.h < 24) || time.h < 6) {
          updateGreet("Good Night");
        }

        if (time.h >= 22) {
          if (view !== "home") {
            alert("Time to go home, udah kemaleman beb");
          }
          setView("home");
        }

        if (time.d === 7) {
          setView("gameOver");
          document
            .getElementsByTagName("BODY")[0]
            .setAttribute(
              "style",
              "background-image: url('images/background/adios.png')"
            );
        }
      }
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, [time]);

  function ViewMode() {
    if (view === "setup") {
      return (
        <SelectAvatar
          dataFetch={playerSetup}
          playMode={updateMode}
          timeStart={updateTime}
          getWeather={updateWeather}
          getNews={updateNews}
        />
      );
    } else if (view === "home") {
      return (
        <Home
          data={userData}
          busy={acts}
          clock={time}
          greeting={greet}
          view={view}
          weather={weather}
          news = {news}
          playMode={updateMode}
          dataFetch={playerSetup}
          isBusy={disableButton}
          changeWeather={updateWeather}
        />
      );
    } else if (view === "campus") {
      return (
        <Campus
          data={userData}
          busy={acts}
          clock={time}
          greeting={greet}
          view={view}
          weather={weather}
          news = {news}
          playMode={updateMode}
          dataFetch={playerSetup}
          isBusy={disableButton}
          changeWeather={updateWeather}
        />
      );
    } else if (view === "cafe") {
      return (
        <Cafe
          data={userData}
          busy={acts}
          clock={time}
          greeting={greet}
          view={view}
          weather={weather}
          news = {news}
          playMode={updateMode}
          dataFetch={playerSetup}
          isBusy={disableButton}
          changeWeather={updateWeather}
        />
      );
    } else if (view === "park") {
      return (
        <Park
          data={userData}
          busy={acts}
          clock={time}
          greeting={greet}
          view={view}
          weather={weather}
          news = {news}
          playMode={updateMode}
          dataFetch={playerSetup}
          isBusy={disableButton}
          changeWeather={updateWeather}
        />
      );
    } else if (view === "cgv") {
      return (
        <Theater
          data={userData}
          busy={acts}
          clock={time}
          greeting={greet}
          view={view}
          weather={weather}
          news = {news}
          playMode={updateMode}
          dataFetch={playerSetup}
          isBusy={disableButton}
          changeWeather={updateWeather}
        />
      );
    } else if (view === "credits") {
      return <AboutUs playMode={updateMode} />;
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
