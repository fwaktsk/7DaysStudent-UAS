import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

function Home(props)
{
    const userData = props.data;
    const time = props.clock;
    const weather = props.weather;
    const acts = props.busy;
    const greet = props.greeting;
    const mode = props.view;

    //function buat update status perinterval

    //background changing

    
            // if(h>=6 && h<=10)
            // {
            // initbg = "background-image: url('images/living-room-day.jpg')";
            // props.changeGreet("Good Morning");
            // }
            // else if(h>10 && h<=15)
            // {
            // initbg = "background-image: url('images/living-room-day.jpg')";
            // props.changeGreet("Good Day");
            // }
            // else if(h>15 && h<=18)
            // {
            // initbg = "background-image: url('images/living-room-day.jpg')";
            // props.changeGreet("Good Afternoon");
            // }
            // else if(h>18 && h<=21)
            // {
            // var initbg = "background-image: url('images/living-room-night.jpg')";
            // props.changeGreet("Good Evening");
            // }
            // else if((h>21 && h<24)||h<6)
            // {
            // initbg = "background-image: url('images/living-room-night.jpg')";
            // props.changeGreet("Good Night");
            // }
            // if((h == 19 && m <= 10)||(h == 6 && m <= 10))
            // {
            // document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
            // }

            // if (m < 10 && h < 10)
            // {
            // document.getElementById("time").innerHTML = "Day: "+ d + "<br/>0" + h + ":0" + m;
            // }
            // else if (m < 10 && h >= 10)
            // {
            // document.getElementById("time").innerHTML = "Day: "+ d + "<br/>" + h + ":0" + m;
            // }
            // else if (m >= 10 && h < 10)
            // {
            // document.getElementById("time").innerHTML = "Day: "+ d + "<br/>0" + h + ":" + m;
            // }
            // else if (m >= 10 && h >= 10)
            // {
            // document.getElementById("time").innerHTML = "Day: "+ d + "<br/>" + h + ":" + m;
            // }

    function eat()
      {
        var hunger = userData.status.hunger;
        if(hunger+1<100)
        {
          props.isBusy(true);
          var img = userData.avatar;
          var path = img.split("/");
          var index = path[2].split(".", 1);
          var newPath = "images/avatar/" + index + "-eat.gif";
          props.dataFetch({...userData, avatar: newPath});
          if(time.h >= 7 && time.h <= 18){  
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/kitchen-day.jpg')");
          }else if(time.h >= 19 || time.h <= 6){ 
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/kitchen-night.jpg')");
          }
          hunger += 5;
          document.getElementById("hunger").value = hunger; //edit
          if(time.h===5 && time.m>=20)
          {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
          }
          if(time.h===18 && time.m>=20)
          {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
          }
        //   setTimeout(function(){m += 30;},2500);
          setTimeout(function()
          {
            props.isBusy(false);
            document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
            props.dataFetch({...userData, avatar: img});
          }, 3000);
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
          props.isBusy(true);
          var img = userData.avatar;
          var path = img.split("/");
          var index = path[2].split(".", 1);
          var newPath = "images/avatar/" + index + "-sleep.gif";
          props.dataFetch({...userData, avatar: newPath});
          if(time.h >= 7 && time.h <= 18){
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/bed-day.jpg')");
          }else if(time.h >= 19 || time.h <= 6){ 
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/bed-night.jpg')");
          }
          rest += 7;
          hunger -= 5;
          document.getElementById("rest").value = rest;
          document.getElementById("hunger").value = hunger;
          if(time.h>=3 && time.h<=5)
          {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
          }
          if(time.h>=16 && time.h <=18)
          {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
          }
        //   setTimeout(function(){h += 3;},2500);
          setTimeout(function()
          {
            props.isBusy(false);
            document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
            props.dataFetch({...userData, avatar: img});
          }, 3000);
        }
      }
      
      function play()
      {
        var ent = userData.status.ent;
        if(ent+1 < 100)
        {
            props.isBusy(true);
            var img = userData.avatar;
            var path = img.split("/");
            var index = path[2].split(".", 1);
          if (time.h >= 7 && time.h <= 18) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/play-day.jpg')");
            var newPath = "images/avatar/" + index + "-play-day.gif";
          } else if (time.h >= 19 || time.h <= 6) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/play-night.jpg')");
            newPath = "images/avatar/" + index + "-play-night.gif";
          }
          props.dataFetch({...userData, avatar: newPath});
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
          if(time.h===5)
          {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
          }
          if(time.h===18)
          {
            initbg = "background-image: url('images/background/living-room-night.jpg')";
          }
        //   setTimeout(function(){h += 1;},2500);
          setTimeout(function()
          {
            props.isBusy(false);
            document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
            props.dataFetch({...userData, avatar: img});
          }, 3000);
        }
      }

      function learn()
      {
        props.isBusy(true);
        var img = userData.avatar;
        var path = img.split("/");
        var index = path[2].split(".", 1);
        var newPath = "images/avatar/" + index + "-study.gif";
        props.dataFetch({...userData, avatar: newPath});
        if (time.h >= 7 && time.h <= 18) {
            document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/study-day.jpg')");
        } else if (time.h >= 19 || time.h <= 6) {
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
        if(time.h>=4 && time.h<=5)
        {
            var initbg = "background-image: url('images/background/living-room-day.jpg')";
        }
        if(time.h>=17 && time.h <= 18)
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
        setTimeout(function()
          {
            props.isBusy(false);
            document.getElementsByTagName("BODY")[0].setAttribute("style", initbg);
            props.dataFetch({...userData, avatar: img});
          }, 3000);
      }

    function GoTo()
    {
        if(acts)
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
        if(acts)
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
                <Button variant="success" onClick={eat} id="eat">Makan</Button>
                <Button variant="success" onClick={sleep} id="sleep">Tidur</Button>
                <Button variant="success" onClick={play} id="play">Main</Button>
                <Button variant="success" onClick={learn} id="study">Belajar</Button>
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
                <h4 id="greet">{greet}, {userData.name}</h4>
                <h4 id="time">Day {time.d}, {time.h}:{time.m}</h4>
                <img id="avatar" src={userData.avatar} alt={userData.avatar} />
            </div>
            </Row>
        </Col>
        <Col xs={4} id="actions">
            <GoTo/>
            <br />
            <Business/>
        </Col>
    </Row>
    );
}

export default Home;