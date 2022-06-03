import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import lesson from "../db/lesson";

function SelectAvatar(props) {
  const [avatar, setAvatar] = useState("images/avatar/1.png");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("Pilih Jurusan");

  const startGame = () => {
    if (avatar !== "" && name !== "" && major !== "") {
      props.resetSecret(false)
      props.dataFetch({
        avatar: avatar,
        name: name,
        major: major,
        status: { hunger: 75, ent: 75, rest: 75, study: 0 },
      });
      if(major === "Informatika")
      {
        props.defineLesson(lesson[0]);
      }
      if(major === "Sistem Informasi")
      {
        props.defineLesson(lesson[1]);
      }
      if(major === "Teknik Komputer")
      {
        props.defineLesson(lesson[2]);
      }
      if(major === "Teknik Elektro")
      {
        props.defineLesson(lesson[3]);
      }
      if (major === "Teknik Fisika")
      {
        props.defineLesson(lesson[4]);
      }
      props.getWeather();
      props.getNews();
      props.timeStart({ d: 0, h: 9, m: 0 });
      const initbg =
        "background-image: url('images/background/living-room-pastmidnight.jpg')";
      document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
      props.playMode("home");
    }
  };

  const Credits = () => {
    props.playMode("credits");
  };

  function pickMajor(key) {
    setMajor(key);
    // console.log(key);
  }

  function nameUpdate(event) {
    // console.log(event.target.value);
    setName(event.target.value);
  }

  function leftArrow() {
    var img = avatar;
    var path = img.split("/");
    var index = parseInt(path[2].split(".", 1));
    if (index === 2) {
      document.getElementById("leftArrow").style.visibility = "hidden";
    }
    index--;
    var newPath = "images/avatar/" + index + ".png";
    setAvatar(newPath);
    if (index === 3) {
      document.getElementById("rightArrow").style.visibility = "visible";
    }
  }

  function rightArrow() {
    var img = avatar;
    var path = img.split("/");
    var index = parseInt(path[2].split(".", 1));
    if (index === 3) {
      document.getElementById("rightArrow").style.visibility = "hidden";
    }
    index++;
    var newPath = "images/avatar/" + index + ".png";
    setAvatar(newPath);
    if (index === 2) {
      document.getElementById("leftArrow").style.visibility = "visible";
    }
  }

  return (
    <div>
      <div
        id="menu"
        className="d-flex align-items-center justify-content-center"
      >
        <input
          type="image"
          src="images/icon/left_arrow.png"
          alt="left-arrow"
          onClick={leftArrow}
          id="leftArrow"
          style={{ visibility: "hidden" }}
        />
        <img id="avatar" src={avatar} alt={avatar} />
        <input
          type="image"
          src="images/icon/right_arrow.png"
          alt="right-arrow"
          onClick={rightArrow}
          id="rightArrow"
        />
      </div>
      <div id="playerDataForm">
        <div id="regis" className="container">
          <div id="nameText">
            <p>Nama</p>
          </div>
        </div>
        <form>
          <div className="container form-floating" id="fillName">
            <input
              type="text"
              id="nama"
              className="form-control"
              placeholder="Nama"
              value={name}
              onChange={nameUpdate}
            />
            <label htmlFor="nama">Masukkan Nama</label>
          </div>

          <Dropdown id={"selectMajor"} onSelect={(key) => pickMajor(key)}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {major}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Informatika"}>
                Informatika
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Sistem Informasi"}>
                Sistem Informasi
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Teknik Komputer"}>
                Teknik Komputer
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Teknik Elektro"}>
                Teknik Elektro
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Teknik Fisika"}>
                Teknik Fisika
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div id="centerDiv">
            <Button variant="success" id="playGame" onClick={startGame}>
              PLAY
            </Button>
          </div>
          <div id="centerDiv">
            <Button variant="warning" id="aboutUs" onClick={Credits}>
              Credits
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SelectAvatar;
