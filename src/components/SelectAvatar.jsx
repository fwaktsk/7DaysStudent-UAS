import React, {useState} from "react";
// import Dropdown from "react-bootstrap/Dropdown";

function SelectAvatar()
{
    const [avatar, setAvatar] = useState("images/avatar/1.png");


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
          <div className="container form-floating" id="isiNama">
            <input type="text" id="nama" className="form-control" placeholder="Nama" />
            <label for="nama">Nama</label>
          </div>
  
          <button type="button" id="playGame" onclick="startGame()" className="btn btn-primary mt-3 mx-auto d-block">PLAY</button>
        </form>
    </div>);
}

export default SelectAvatar;