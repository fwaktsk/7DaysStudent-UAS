import React, { useState, useEffect } from "react";

function Banner(props)
{
  const [weatherIcon, setWeatherIcon] = useState("");
  const view = props.view;
  const weather = props.weather;

  function updateWeather()
  {
    if(view !== "setup" || view !== "credits")
    {
      if(props.clock.h >=6 && props.clock.h <=18)
    {
      if(String(weather) === "Rain")
        {
          setWeatherIcon("./images/icon/10d@2x.png")
        }
        else if(String(weather) === "Clouds")
        {
          setWeatherIcon("./images/icon/02d@2x.png")
        }
        else if(String(weather) === "Clear")
        {
          setWeatherIcon("./images/icon/01d@2x.png")
        }
      }
      else if((props.clock.h >18 && props.clock.h <24)||props.clock.h <6)
      {
        if(String(weather) === "Rain")
        {
          setWeatherIcon("./images/icon/10n@2x.png")
        }
        else if(String(weather) === "Clouds")
        {
          setWeatherIcon("./images/icon/02n@2x.png")
        }
        else if(String(weather) === "Clear")
        {
          setWeatherIcon("./images/icon/01n@2x.png")
        }
      }
    }
  }

  useEffect(() => {
    updateWeather();
  }, [weather]);

    if(view === "setup" || view === "credits" || view === "gameOver")
    {
      return(
        <div id="banner" className="d-block align-items-center justify-content-center">
          <img width="80" src="images/icon/piala.png" alt="icon" className="img-fluid" />
          <br />
          <div className="text-center">
            <h3>7 Days Student</h3>
          </div>
          <hr />
        </div>
        );
    }
    else
    {
      return(
        <div id="banner" className="d-block align-items-center justify-content-center">
          <img width="80" src={weatherIcon} alt="weather" className="img-fluid" />
          <br />
          <div className="text-center">
            <h3>{weather}</h3>
          </div>
          <hr />
        </div>
      );
    }
}

export default Banner;