import Banner from "./components/Banner";
import SelectAvatar from "./components/SelectAvatar";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Campus from "./components/Campus";
import Cafe from "./components/Cafe";
import Park from "./components/Park";
import Theater from "./components/Theater";
import AboutUs from "./components/AboutUs";
import GameOver from "./components/GameOver";

function App(props) {
  const [view, setView] = useState("setup");
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    major: "",
    status: { hunger: 75, ent: 75, rest: 75, study: 0 },
  });
  const [acts, setActs] = useState(false);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0 });
  const [greet, setGreet] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [news, setNews] = useState("");
  const [newsData, setNewsData] = useState();
  const [newsIdx, setNewsIdx] = useState(0);
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [lessons, setLessons] = useState();
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

  const updateLesson = (bundle) =>{
    setLessons(bundle);
  };

  const updateWeather = () => {
    setWeatherIdx(weatherIdx + 1);
    setWeather(weatherData[weatherIdx].weather[0].main);
  };

  const updateNews = () => {
    setNewsIdx(Math.floor(Math.random() * 19));
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
  }, []);

  useEffect(() => {
    const clock = setInterval(function () {
      if (view !== "setup" && view !== "credits" && view !== "gameOver") {

        if (userData.status.hunger <= 0 || userData.status.ent <= 0 || userData.status.rest <= 0) {
          if (userData.status.hunger <= 0)
          {
            alert("GAME OVER... " + userData.name + " meninggal akibat tidak dapat mendapat bansos untuk makan :(((");
            var img = document.getElementById("avatar");
            var e = img.getAttribute("src");
            var path = e.split("/");
            var index = path[2].split(".", 1);
            var newPath = "images/avatar/" + index + "-starve.png";
            setUserData({ ...userData, avatar: newPath });
          }
          else if (userData.status.ent <= 0)
          {
            alert("GAME OVER... " + userData.name + " meninggal akibat tidak dapat mendapat bansos untuk makan :(((");
            img = document.getElementById("avatar");
            e = img.getAttribute("src");
            path = e.split("/");
            index = path[2].split(".", 1);
            newPath = "images/avatar/" + index + "-stress.png";
            setUserData({ ...userData, avatar: newPath });
          }
          else if (userData.status.rest <= 0)
          {
            alert("GAME OVER... " + userData.name + " mati terkena geger otak karena kelelahan :(((");
            img = document.getElementById("avatar");
            e = img.getAttribute("src");
            path = e.split("/");
            index = path[2].split(".", 1);
            newPath = "images/avatar/" + index + "-tired.png";
            setUserData({ ...userData, avatar: newPath });
          }
          setView("gameOver");
          }

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
          var completion = 0
          for (let i = 0; i < 7; i++) {
            if(lessons[i].learnt)
            {
              completion += 1;
            }
            
          }
          if(completion === 7 && userData.status.study >= 100)
          {
            alert("You did well! Kayaknya jadi mahasiswa " + userData.major + " sesuai sama potensimu, jadi dosen yuk");
          }
          else if(completion === 7 && userData.status.study <= 100)
          {
            alert("Kamu radjin deh bisa ikut semua pelajaran, tapi jangan lupa belajar lagi diluar kelas biar bisa ngikutin");
          }else if (completion < 7 && completion > 3 && userData.status.study >= 100)
          {
            alert("Kamu belajar banyak tapi ga terkait ama kuliahnya");
          }else if (completion < 7 && completion > 3 && userData.status.study <= 100)
          {
            alert("B ajah bambank");
          }else if(completion <= 3)
          {
            alert("Baru minggu pertama loh, WOE! Belajar lagi kids");
            newPath = "images/avatar/mood.png";
            setUserData({ ...userData, avatar: newPath });
          }
          
          setView("gameOver");
          document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/adios.png')");
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
          defineLesson={updateLesson}
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
          isBusy = {acts}
          playMode={updateMode}
          dataFetch={playerSetup}
          setBusy={disableButton}
          fastForward={updateTime}
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
          isBusy = {acts}
          matcool = {lessons}
          playMode={updateMode}
          dataFetch={playerSetup}
          setBusy={disableButton}
          fastForward={updateTime}
          changeWeather={updateWeather}
          joinClass={updateLesson}
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
          isBusy = {acts}
          playMode={updateMode}
          dataFetch={playerSetup}
          setBusy={disableButton}
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
          isBusy = {acts}
          playMode={updateMode}
          dataFetch={playerSetup}
          fastForward={updateTime}
          setBusy={disableButton}
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
          isBusy = {acts}
          playMode={updateMode}
          dataFetch={playerSetup}
          fastForward={updateTime}
          setBusy={disableButton}
          changeWeather={updateWeather}
        />
      );
    } else if (view === "gameOver")
    {
      return <GameOver avatar={userData.avatar}
                      playMode={updateMode}
                      day = {time.d}/>
    }else if (view === "credits") {
      return <AboutUs playMode={updateMode} />;
    }
  }

  return (
    <div id="App">
      <Banner 
          view={view}
          weather={weather}
          clock={time}
          />
      <ViewMode />
    </div>
  );
}

export default App;

//

//lagi edit

//
