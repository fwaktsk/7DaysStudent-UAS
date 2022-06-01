import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Theater(props) {
  const userData = props.data;
  const time = props.clock;
  const weather = props.weather;
  const acts = props.busy;
  const greet = props.greeting;
  const mode = props.view;
  const news = props.news;

  //function buat update status perinterval

  function setMainBG() {
    if (String(weather) === "Rain") {
      var initbg =
        "background-image: url('images/background/living-room-dayrain.jpg')";
    } else if (time.h >= 6 && time.h <= 18) {
      initbg = "background-image: url('images/background/living-room-day.jpg')";
    } else if (time.h > 18 && time.h < 24) {
      initbg =
        "background-image: url('images/background/living-room-night.jpg')";
    } else if (time.h < 6) {
      initbg =
        "background-image: url('images/background/living-room-pastmidnight.jpg')";
    }
    document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
  }

  //background changing
  useEffect(() => {
    const bg = setInterval(() => {
      setMainBG();
    }, 1000);

    return () => {
      clearInterval(bg);
    };
  }, [time]);

  function watch() {
    var status = userData.status;
    if (status.ent + 1 < 100) {
      props.isBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      if (time.h >= 7 && time.h <= 18) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/play-day.jpg')"
          );
        var newPath = "images/avatar/" + index + "-play-day.gif";
      } else if (time.h >= 19 || time.h <= 6) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/play-night.jpg')"
          );
        newPath = "images/avatar/" + index + "-play-night.gif";
      }
      props.dataFetch({ ...userData, avatar: newPath });
      status.ent += 9;
      status.rest -= 5;
      status.hunger -= 10;
      //edit
      props.dataFetch({ ...userData, status: status });
      //   setTimeout(function(){h += 1;},2500);
      setTimeout(function () {
        setMainBG();
        props.isBusy(false);
        props.dataFetch({ ...userData, avatar: img });
      }, 1000);
    }
  }

  function goToHome() {
    props.playMode("home");
  }

  function goToCampus() {
    if (time.h >= 6) {
      props.playMode("campus");
    } else {
      alert("Masih malem dek");
    }
  }

  function goToCafe() {
    if (time.h >= 9) {
      props.playMode("cafe");
    } else {
      alert("Cafe masih tutup tsay");
    }
  }

  function goToPark() {
    if (time.h >= 8) {
      props.playMode("park");
    } else {
      alert("Look at the time, kid. It's not for Dufan");
    }
  }

  function GoTo() {
    if (acts) {
      return (
        <Row>
          {/* GoTo */}
          <p>@ Cinema XXI</p>
          <Button variant="success" disabled>
            Home
          </Button>
          <Button variant="success" disabled>
            Kampus
          </Button>
          <Button variant="success" disabled>
            Taman Rekreasi
          </Button>
          <Button variant="success" disabled>
            Theater
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          {/* GoTo */}
          <p>@ Cinema XXI</p>
          <Button variant="success" onClick={goToHome}>
            Home
          </Button>
          <Button variant="success" onClick={goToCampus}>
            Kampus
          </Button>
          <Button variant="success" onClick={goToCafe}>
            Cafe
          </Button>
          <Button variant="success" onClick={goToPark}>
            Theater
          </Button>
        </Row>
      );
    }
  }

  function Business() {
    if (acts) {
      return (
        <Row>
          {/* Actions TEST*/}
          <p>Activities</p>
          <Button variant="success" disabled id="watch">
            Nonton
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          {/* Actions TEST*/}
          <p>Activities</p>
          <Button variant="success" onClick={watch} id="watch">
            Nonton
          </Button>
        </Row>
      );
    }
  }

  function Phone()
  {
    return (<Col>
      <div className="phone">
        <div className="notch-container">
          <div className="notch"></div>
        </div>
        <div className="phone-content">
        <h4>{news.title}</h4>
          <p>{news.author}</p>
          <img src={news.image} alt={news.image} />
          <p>{news.desc}</p>
          <a href={news.readMore}>Read More...</a>
        </div>
      </div>
      </Col>);
  }

  return (
    <div id="ui">
      <Row>
        <Col xs={8} id="status">
          <Row>
            <Col md={3} xs={12}>
              <label htmlFor="hunger">
                <img id="icon" src="images/icon/makan.png" alt="makan" />
              </label>
              <meter
                id="hunger"
                min="0"
                low="15"
                value={userData.status.hunger}
                optimum="60"
                high="70"
                max="100"
              ></meter>
            </Col>
            <Col md={3} xs={12}>
              <label htmlFor="entertainment">
                <img id="icon" src="images/icon/controller.png" alt="hiburan" />
              </label>
              <meter
                id="entertainment"
                min="0"
                low="15"
                value={userData.status.ent}
                optimum="60"
                high="70"
                max="100"
              ></meter>
            </Col>
            <Col md={3} xs={12}>
              <label htmlFor="rest">
                <img id="icon" src="images/icon/bobo.png" alt="rest" />
              </label>
              <meter
                id="rest"
                min="0"
                low="15"
                value={userData.status.rest}
                optimum="60"
                high="70"
                max="100"
              ></meter>
            </Col>
            <Col md={3} xs={12}>
              <label htmlFor="belajar">
                <img id="icon" src="images/icon/belajar.png" alt="belajar" />
              </label>
              <progress
                id="belajar"
                value={userData.status.study}
                max="100"
              ></progress>
            </Col>
            <div className="w-100"></div>
            <Phone />
            <Col id="home">
              <h4>{userData.major} Semester 1</h4>
              <h4 id="greet">
                {greet}, {userData.name}
              </h4>
              <h4 id="time">
                Day {time.d}, {time.h}:{time.m}
              </h4>
              <img id="avatar" src={userData.avatar} alt={userData.avatar} />
            </Col>
          </Row>
        </Col>
        <Col xs={4} id="actions">
          <GoTo />
          <br />
          <Business />
        </Col>
      </Row>
    </div>
  );
}

export default Theater;