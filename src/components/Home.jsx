import React, {useState, useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

function Home(props)
{
    const userData = props.data;
    const [time, updateTime] = useState({day:"Minggu", h:0, m:0});
    const [weather, changeWeather] = useState("sunny");
    const [acts, toggleActs] = useState();

    useEffect( () => {
        console.log(acts);
    }, [acts]);

    var h = time.h;
    var m = time.m;
    //function buat update status perinterval

    function eat()
      {
        var hunger = userData.status.hunger;
        if(hunger+1<100)
        {
          var img = userData.avatar;
          var path = img.split("/");
          var index = path[2].split(".", 1);
          var newPath = "images/avatar/" + index + "-eat.gif";
          props.dataFetch({...userData, avatar: newPath});
          if(h >= 7 && h <= 18){  
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/kitchen-day.jpg')");
          }else if(h >= 19 || h <= 6){ 
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/kitchen-night.jpg')");
          }
          toggleActs("disabled");
          hunger += 5;
          document.getElementById("hunger").value = hunger; //edit
          if(h===5 && m>=20)
          {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
          }
          if(h===18 && m>=20)
          {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
          }
        //   setTimeout(function(){m += 30;},2500);
        //   setTimeout(function()
        //   {
        //     toggleacts(false);
        //     document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
        //     props.dataFetch({...userData, avatar: img});
        //   }, 3000);
        }
        else
        {
          alert(userData.name + " sudah kenyang. Nanti malah muntah");
        }
      }

      function sleep()
      {
        var rest = userData.status.rest;
        var hunger = userData.status.hunger;
        if(rest+1<100)
        {
          var img = userData.avatar;
          var path = img.split("/");
          var index = path[2].split(".", 1);
          var newPath = "images/avatar/" + index + "-sleep.gif";
          props.dataFetch({...userData, avatar: newPath});
          if(h >= 7 && h <= 18){
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/bed-day.jpg')");
          }else if(h >= 19 || h <= 6){ 
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/bed-night.jpg')");
          }
          toggleActs("disabled");
          rest += 7;
          hunger -= 5;
          document.getElementById("rest").value = rest;
          document.getElementById("hunger").value = hunger;
          if(h>=3 && h<=5)
          {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
          }
          if(h>=16 && h <=18)
          {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
          }
        //   setTimeout(function(){h += 3;},2500);
        //   setTimeout(function()
        //   {
        //     toggleacts(false);
        //     document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
        //     props.dataFetch({...userData, avatar: img});
        //   }, 3000);
        }
      }
      
      function play()
      {
        var ent = userData.status.ent;
        if(ent+1 < 100)
        {
            var img = userData.avatar;
            var path = img.split("/");
            var index = path[2].split(".", 1);
          if (h >= 7 && h <= 18) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/play-day.jpg')");
            var newPath = "images/avatar/" + index + "-play-day.gif";
          } else if (h >= 19 || h <= 6) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/play-night.jpg')");
            newPath = "images/avatar/" + index + "-play-night.gif";
          }
          props.dataFetch({...userData, avatar: newPath});
          toggleActs("disabled");
          var rest = userData.status.rest;
          var hunger = userData.status.hunger;
          ent += 9;
          rest -= 5;
          hunger -= 10;
          //edit
          document.getElementById("rest").value = rest;
          document.getElementById("entertainment").value = ent;
          document.getElementById("hunger").value = hunger;
          //edit
          if(h===5)
          {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
          }
          if(h===18)
          {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
          }
        //   setTimeout(function(){h += 1;},2500);
        //   setTimeout(function()
        //   {
        //     toggleacts(false);
        //     document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
        //     props.dataFetch({...userData, avatar: img});
        //   }, 3000);
        }
      }

      function learn()
      {
        var img = userData.avatar;
        var path = img.split("/");
        var index = path[2].split(".", 1);
        var newPath = "images/avatar/" + index + "-study.gif";
        props.dataFetch({...userData, avatar: newPath});
        toggleActs("disabled");
        if (h >= 7 && h <= 18) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/study-day.jpg')");
        } else if (h >= 19 || h <= 6) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/study-night.jpg')");
        }
        var study = userData.status.study;
        var ent = userData.status.ent;
        var rest = userData.status.rest;
        var hunger = userData.status.hunger;
        study += 1;
        ent -= 10;
        rest -= 5;
        hunger -= 5;
        //edit
        document.getElementById("rest").value = rest;
        document.getElementById("entertainment").value = ent;
        document.getElementById("hunger").value = hunger;
        document.getElementById("belajar").value = study;
        //edit
        if(h>=4 && h<=5)
        {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
        }
        if(h>=17 && h <= 18)
        {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
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
        // setTimeout(function()
        //   {
        //     toggleActs(false);
        //     document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
        //     props.dataFetch({...userData, avatar: img});
        //   }, 3000);
      }

    function GoTo()
    {
        if(acts === "disabled")
        {
            return(
                <Row>
                    {/* GoTo */}
                    <p>@ Home</p>
                    <Button variant="success" disabled>Kampus</Button>
                    <Button variant="success" disabled>Kafe</Button>
                    <Button variant="success" disabled>Supermarket</Button>
                    <Button variant="success" disabled>Taman Rekreasi</Button>
                    <Button variant="success" disabled>Theater</Button>
                </Row>);
        }
        else
        {
            return(
                <Row>
                    {/* GoTo */}
                    <p>@ Home</p>
                    <Button variant="success">Kampus</Button>
                    <Button variant="success">Kafe</Button>
                    <Button variant="success">Supermarket</Button>
                    <Button variant="success">Taman Rekreasi</Button>
                    <Button variant="success">Theater</Button>
                </Row>);
        }
    }

    function Business()
    {
        if(acts === "disabled")
        {
            return (<Row>
                {/* Actions TEST*/}
                <p>Activities</p>
                <Button variant="success" disabled id="eat">Makan</Button>
                <Button variant="success" disabled id="sleep">Tidur</Button>
                <Button variant="success" disabled id="play">Main</Button>
                <Button variant="success" disabled id="study">Belajar</Button>
            </Row>);
        }
        else
        {
            return (<Row>
                {/* Actions TEST*/}
                <p>Activities</p>
                 {/* type="button" id="eat" onclick="eat()" class="btn btn-primary mt-3 mx-auto d-block" */}
                <Button variant="success" onClick={!acts?eat:null} id="eat">Makan</Button>
                <Button variant="success" onClick={!acts?sleep:null} id="sleep">Tidur</Button>
                <Button variant="success" onClick={!acts?play:null} id="play">Main</Button>
                <Button variant="success" onClick={!acts?learn:null} id="study"className="pe-auto">Belajar</Button>
            </Row>);
        }
    }

    return (
    <Row id="ui">
        <Col xs={8} id="status">
            <Row>
            <Col md={3} xs={12}>
                <label htmlFor="hunger"><img id="icon" src="images/icon/makan.png" alt="makan"/></label>
                <meter id="hunger" min="0" low="15" value={userData.status.hunger} optimum="60" high="70" max="100"></meter>
            </Col>
            <Col md={3} xs={12}>
                <label htmlFor="entertainment"><img id="icon" src="images/icon/controller.png" alt="hiburan" /></label>
                <meter id="entertainment" min="0" low="15" value={userData.status.ent} optimum="60" high="70" max="100"></meter>
            </Col>
            <Col md={3} xs={12}>
                <label htmlFor="rest"><img id="icon" src="images/icon/bobo.png" alt="rest" /></label>
                <meter id="rest" min="0" low="15" value={userData.status.rest} optimum="60" high="70" max="100"></meter>
            </Col>
            <Col md={3} xs={12}>
                <label htmlFor="belajar"><img id="icon" src="images/icon/belajar.png" alt="belajar"/></label>
                <progress id="belajar" value={userData.status.study} max="100"></progress>
            </Col>
            <div className="w-100"></div>
            <div id="home">
                <h4>Semester 1</h4>
                <h4 id="greet">Good Night, {userData.name}</h4>
                <h4 id="time">{time.day}, {time.h}:{time.m}</h4>
                <img id="avatar" width="25%" src={userData.avatar} alt={userData.avatar} />
            </div>
            </Row>
        </Col>
        <Col xs={4} id="actions">
            <GoTo />
            <br />
            <Business />
        </Col>
    </Row>
    );
}

export default Home;