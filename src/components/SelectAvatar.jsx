import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";

function SelectAvatar()
{
    const [avatar, setAvatar] = useState("images/avatar/1.png");
    const [name, setName] = useState("")
    const [major, setMajor] = useState("Pilih Jurusan");

    function pickMajor(key)
    {
      setMajor(key);
      // console.log(key);
    }

    function nameUpdate(event)
    {
      // console.log(event.target.value);
      setName(event.target.value);
    }

    // function startGame()
    // {
    //   // 
    // }

    function leftArrow() {
        var img = avatar;
        var path = img.split("/");
        var index = path[2].split(".", 1);
        if (index == 2) {
        document.getElementById("leftArrow").style.visibility = "hidden";
        }
        index--;
        var newPath = "images/avatar/" + index + ".png";
        setAvatar(newPath)
        if (index == 3) {
        document.getElementById("rightArrow").style.visibility = "visible";
        }
    }

      function rightArrow() {
        var img = avatar;
        var path = img.split("/");
        var index = path[2].split(".", 1);
        if (index == 3) {
          document.getElementById("rightArrow").style.visibility = "hidden";
        }
        index++;
        var newPath = "images/avatar/" + index + ".png";
        setAvatar(newPath);
        if (index == 2) {
          document.getElementById("leftArrow").style.visibility = "visible";
        }
      }


    return(
    <div>
        <div id="menu" className="d-flex align-items-center justify-content-center">
            <input type="image" src="images/icon/left_arrow.png" onClick={leftArrow} id="leftArrow"/>
            <img id="avatar" src={avatar} />
            <input type="image" src="images/icon/right_arrow.png" onClick={rightArrow} id="rightArrow"/>
        </div>
        <div id="regis" className="container align-items-center align-content-center">
            <div id="nameText">
            <p>Enter your name here...</p>
            </div>
        </div>
      <form>
          <div className="container form-floating" id="fillName">
            <input type="text" id="nama" className="form-control" placeholder="Nama" value={name} onChange={nameUpdate}/>
            <label htmlFor="nama">Nama</label>
          </div>

          <Dropdown id={"selectMajor"} onSelect={(key)=> pickMajor(key)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {major}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Informatika"}>Informatika</Dropdown.Item>
              <Dropdown.Item eventKey={"Sistem Informasi"}>Sistem Informasi</Dropdown.Item>
              <Dropdown.Item eventKey={"Teknik Komputer"}>Teknik Komputer</Dropdown.Item>
              <Dropdown.Item eventKey={"Teknik Elektro"}>Teknik Elektro</Dropdown.Item>
              <Dropdown.Item eventKey={"Teknik Fisika"}>Teknik Fisika</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
  
          <button type="button" id="playGame" className="btn btn-primary mt-3 mx-auto d-block">PLAY</button>
        </form>
    </div>);
}

export default SelectAvatar;