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

  //function buat update status perintervala

  function setMainBG() {
    if(!(props.isBusy))
    {
      if (String(weather) === "Rain") {
        var initbg =
          "background-image: url('images/background/uni-lobby-rain.gif')"; // Rain
      } else if (String(weather) === "Clouds") {
        initbg = "background-image: url('images/background/uni-lobby-clouds.gif')"; // Pagi
      } else {
        initbg =
          "background-image: url('images/background/uni-lobby-clear.jpg')"; // Malam
      }
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

  function eat() { //kantin
    var status = userData.status;
    if (status.hunger + 1 < 100) {
      props.setBusy(true);
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
        props.dataFetch({ ...userData, avatar: img, status: status });
        time.m += 10;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    } else {
      alert(userData.name + " sudah kenyang. Nanti malah muntah");
    }
  }

  function read() { // library baca buku
    var status = userData.status;
    if (status.ent + 1 < 100) {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-library.jpeg')");
      var newPath = "images/avatar/" + index + "-read.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      setTimeout(function () {
        status.study += 3;
        status.ent += 3;
        status.rest -= 5;
        status.hunger -= 5;
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

  function goToCafe() {
    var x = Math.floor(Math.random()*100);
    console.log(x);
    if(x<10)
    {
      props.accident(true);
    }
    if (time.h >= 9) {
      props.playMode("cafe");
    } else {
      alert("Cafe masih tutup tsay");
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
          <Button variant="success" disabled id="eat">
            Makan
          </Button>
          <Button variant="success" disabled id="read">
            Baca Buku
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
          <Button variant="success" onClick={read} id="read">
            Baca Buku
          </Button>
        </Row>
      );
    }
  }

  function ikutKelas1()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 18;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[0];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 3;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function ikutKelas2()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 18;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[1];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 3;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function ikutKelas3()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 12;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[2];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 2;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function ikutKelas4()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 12;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[3];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 2;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function ikutKelas5()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 12;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[4];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 2;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function ikutKelas6()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 12;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[5];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 2;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function ikutKelas7()
  {
    var status = userData.status;
    if(status.study <= 100)
    {
      props.setBusy(true);
      var img = userData.avatar;
      var path = img.split("/");
      var index = path[2].split(".", 1);
      var newPath = "images/avatar/" + index + "-study.gif";
      props.dataFetch({ ...userData, avatar: newPath });
      document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/uni-class.jpeg')");
      setTimeout(function () {
        status.study += 12;
        status.ent -= 20;
        status.rest -= 20;
        status.hunger -= 20;
        props.dataFetch({ ...userData, avatar: img, status: status });
        var matkul = props.matcool[6];
        matkul.learnt = true;
        props.joinClass({...props.matcool, matkul});
        time.h += 3;
        time.m += 3;
        props.fastForward({...time});
        props.setBusy(false);
        setMainBG();
      }, 3000);
    }
  }

  function Lesson1() {
    if (props.matcool[0].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[0].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas1}>
            Ikut Kelas {props.matcool[0].nama_matkul}
          </Button>
        </Row>
      );
    }
  }

  function Lesson2() {
    if (props.matcool[1].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[1].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas2}>
            Ikut Kelas {props.matcool[1].nama_matkul}
          </Button>
        </Row>
      );
    }
  }

  function Lesson3() {
    if (props.matcool[2].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[2].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas3}>
            Ikut Kelas {props.matcool[2].nama_matkul}
          </Button>
        </Row>
      );
    }
  }

  function Lesson4() {
    if (props.matcool[3].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[3].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas4}>
            Ikut Kelas {props.matcool[3].nama_matkul}
          </Button>
        </Row>
      );
    }
  }

  function Lesson5() {
    if (props.matcool[4].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[4].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas5}>
            Ikut Kelas {props.matcool[4].nama_matkul}
          </Button>
        </Row>
      );
    }
  }

  function Lesson6() {
    if (props.matcool[5].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[5].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas6}>
            Ikut Kelas {props.matcool[5].nama_matkul}
          </Button>
        </Row>
      );
    }
  }

  function Lesson7() {
    if (props.matcool[6].learnt || props.isBusy) {
      return (
        <Row>
          <Button variant="success" disabled>
            Ikut Kelas {props.matcool[6].nama_matkul}
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button variant="success" onClick={ikutKelas7}>
            Ikut Kelas {props.matcool[6].nama_matkul}
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
          <Lesson1 />
          <Lesson2 />
          <Lesson3 />
          <Lesson4 />
          <Lesson5 />
          <Lesson6 />
          <Lesson7 />
        </Col>
      </Row>
    </div>
  );
}

export default Campus;
