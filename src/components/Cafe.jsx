import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Cafe(props) {
  const userData = props.data;
  const time = props.clock;
  const weather = props.weather;
  const acts = props.busy;
  const greet = props.greeting;
  const mode = props.view;
  const news = props.news;

  //function buat update status perintervala

  function setMainBG() {
    if(!props.isBusy)
    {
      var initbg = "background-image: url('images/background/cafe.jpeg')"; // Rain
      document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
    }
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
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-eat.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      setTimeout(function () {
        status.hunger += 5;
        props.dataFetch({ ...userData, avatar: img, status: status });
        props.setBusy(false);
        setMainBG();
      }, 3000);
    } else {
      alert(userData.name + " sudah kenyang. Nanti malah muntah");
    }
  }

  function drink() {
    var status = userData.status;
    if (status.hunger + 1 < 100) {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-drink.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      setTimeout(function () {
        status.hunger += 3;
        props.dataFetch({ ...userData, avatar: img, status: status });
        props.setBusy(false);
        setMainBG();
      }, 3000);
    } else {
      alert(userData.name + " sudah kembung");
    }
  }

  function watch() {
    var status = userData.status;
    if (status.ent + 1 < 100) {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-play-day.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      setTimeout(function () {
        status.ent += 9;
        status.rest -= 5;
        status.hunger -= 10;
        props.dataFetch({ ...userData, avatar: img, status: status });
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function goToHome() {
    var x = Math.floor(Math.random()*100);
    console.log(x);
    if(x<10)
    {
      props.accident(true);
    }
    props.playMode("home");
  }

  function goToCampus() {
    var x = Math.floor(Math.random()*100);
    console.log(x);
    if(x<10)
    {
      props.accident(true);
    }
    if (time.h >= 6) {
      props.playMode("campus");
    } else {
      alert("Masih malem dek");
    }
  }

  function goToPark() {
    var x = Math.floor(Math.random()*100);
    console.log(x);
    if(x<10)
    {
      props.accident(true);
    }
    if (time.h >= 8) {
      props.playMode("park");
    } else {
      alert("Look at the time, kid. It's not for Dufan");
    }
  }

  function goToTheater() {
    var x = Math.floor(Math.random()*100);
    console.log(x);
    if(x<10)
    { 
      props.accident(true);
    }
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
          <p>@ Cafe</p>
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
          <p>@ Cafe</p>
          <Button variant="success" onClick={goToHome}>
            Home
          </Button>
          <Button variant="success" onClick={goToCampus}>
            Kampus
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
          <Button variant="success" disabled id="eat">
            Makan
          </Button>
          <Button variant="success" disabled id="drink">
            Minum
          </Button>
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
          <Button variant="success" onClick={eat} id="eat">
            Makan
          </Button>
          <Button variant="success" onClick={drink} id="drink">
            Minum
          </Button>
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

export default Cafe;
