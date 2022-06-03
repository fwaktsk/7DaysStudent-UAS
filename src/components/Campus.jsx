import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Campus(props) {
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
        "background-image: url('images/background/uni-lobby-day.jpeg')";
    } else if (time.h >= 6 && time.h <= 18) {
      initbg = "background-image: url('images/background/uni-lobby-day.jpeg')";
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

  function eat() {
    var status = userData.status;
    if (status.hunger + 1 < 100) {
      props.isBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-eat.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      if (time.h >= 7 && time.h <= 18) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/kantin_umn.jpg')"
          );
      } else if (time.h >= 19 || time.h <= 6) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/kantin_umn.jpg')"
          );
      }
      //   setTimeout(function(){m += 30;},2500);
      setTimeout(function () {
        status.hunger += 5;
        props.dataFetch({ ...userData, status: status });
        setMainBG();
        props.isBusy(false);
        props.dataFetch({ ...userData, avatar: img });
      }, 1000);
    } else {
      alert(userData.name + " sudah kenyang. Nanti malah muntah");
    }
  }

  function sleep() {
    var status = userData.status;
    if (status.rest + 1 < 100) {
      props.isBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-sleep.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      if (time.h >= 7 && time.h <= 18) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/bed-day.jpg')"
          );
      } else if (time.h >= 19 || time.h <= 6) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/bed-night.jpg')"
          );
      }
      //   setTimeout(function(){h += 3;},2500);
      setTimeout(function () {
        status.rest += 7;
        status.hunger -= 5;
        props.dataFetch({ ...userData, status: status });
        setMainBG();
        props.isBusy(false);
        // document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
        props.dataFetch({ ...userData, avatar: img });
      }, 1000);
    }
  }

  function play() {
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
            "background-image: url('images/background/uni-library.jpeg')"
          );
        var newPath = "images/avatar/" + index + "-read.png";
      } else if (time.h >= 19 || time.h <= 6) {
        document
          .getElementsByTagName("BODY")[0]
          .setAttribute(
            "style",
            "background-image: url('images/background/uni-library.jpeg')"
          );
        newPath = "images/avatar/" + index + "-play-night.gif";
      }
      props.dataFetch({ ...userData, avatar: newPath });
      //   setTimeout(function(){h += 1;},2500);
      setTimeout(function () {
        status.ent += 9;
        status.rest -= 5;
        status.hunger -= 10;
        props.dataFetch({ ...userData, status: status });
        setMainBG();
        props.isBusy(false);
        props.dataFetch({ ...userData, avatar: img });
      }, 1000);
    }
  }

  function learn() {
    props.isBusy(true);
    var img = userData.avatar;
    var path = img.split("/");
    var index = path[2].split(".", 1);
    var newPath = "images/avatar/" + index + "-study.gif";
    props.dataFetch({ ...userData, avatar: newPath });
    if (time.h >= 7 && time.h <= 18) {
      document
        .getElementsByTagName("BODY")[0]
        .setAttribute(
          "style",
          "background-image: url('images/background/kelas_umn.jpeg')"
        );
    } else if (time.h >= 19 || time.h <= 6) {
      document
        .getElementsByTagName("BODY")[0]
        .setAttribute(
          "style",
          "background-image: url('images/background/kelas_umn.jpeg')"
        );
    }
    // if(study == 100)
    // {
    //   if(sem == 8)
    //   {
    //     gameOver();
    //   }
    //   document.getElementById("belajar").value = 0;
    //   st /= 2;
    //   sem += 1;
    //   d = 0;
    //   document.getElementById("semester").innerHTML = "Semester " + sem;
    // }
    // setTimeout(function(){h += 2;},2500);
    setTimeout(function () {
      var status = userData.status;
      status.study += 5;
      status.ent -= 10;
      status.rest -= 5;
      status.hunger -= 5;
      props.dataFetch({ ...userData, status: status });
      setMainBG();
      props.isBusy(false);
      props.dataFetch({ ...userData, avatar: img });
    }, 1000);
  }

  function goToHome() {
    props.playMode("home");
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

  function goToTheater() {
    if (time.h >= 8) {
      props.playMode("cgv");
    } else {
      alert("Gada anime babang uibu");
    }
  }

  function GoTo() {
    if (acts) {
      return (
        <Row>
          {/* GoTo */}
          <p>@ Campus</p>
          <Button variant="success" disabled>
            Home
          </Button>
          <Button variant="success" disabled>
            Kafe
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
          <p>@ Campus</p>
          <Button variant="success" onClick={goToHome}>
            Home
          </Button>
          <Button variant="success" onClick={goToCafe}>
            Kafe
          </Button>
          <Button variant="success" onClick={goToPark}>
            Taman Rekreasi
          </Button>
          <Button variant="success" onClick={goToTheater}>
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
          <Button variant="success" disabled id="study">
            Ikut Kelas
          </Button>
          <Button variant="success" disabled id="eat">
            Makan
          </Button>
          <Button variant="success" disabled id="play">
            Baca Buku
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          {/* Actions TEST*/}
          <p>Activities</p>
          <Button variant="success" onClick={learn} id="study">
            Ikut Kelas
          </Button>
          <Button variant="success" onClick={eat} id="eat">
            Makan
          </Button>
          <Button variant="success" onClick={play} id="play">
            Baca Buku
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

export default Campus;
