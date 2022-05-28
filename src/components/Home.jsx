import React, {useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

function Home(props)
{
    const userData = props.data;
    const [status, updateStatus] = useState({hunger:75, ent: 75, rest: 75, study: 0});
    const [time, updateTime] = useState({day:"Minggu", h:0, m:0});
    const [weather, changeWeather] = useState("sunny"); //?

    //function buat update status perinterval

    return (
    <Row id="ui">
        <Col xs={8} id="status">
            <Row>
            <Col md={3} xs={12}>
                <label htmlFor="hunger"><img id="icon" src="images/icon/makan.png" alt="makan"/></label>
                <meter id="hunger" min="0" low="15" value={status.hunger} optimum="60" high="70" max="100"></meter>
            </Col>
            <Col md={3} xs={12}>
                <label htmlFor="entertainment"><img id="icon" src="images/icon/controller.png" alt="hiburan" /></label>
                <meter id="entertainment" min="0" low="15" value={status.ent} optimum="60" high="70" max="100"></meter>
            </Col>
            <Col md={3} xs={12}>
                <label htmlFor="rest"><img id="icon" src="images/icon/bobo.png" alt="rest" /></label>
                <meter id="rest" min="0" low="15" value={status.rest} optimum="60" high="70" max="100"></meter>
            </Col>
            <Col md={3} xs={12}>
                <label htmlFor="belajar"><img id="icon" src="images/icon/belajar.png" alt="belajar"/></label>
                <progress id="belajar" value={status.study} max="100"></progress>
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
            <Row>
                {/* GoTo */}
                <p>@ Home</p>
                <Button variant="success">Kampus</Button>
                <Button variant="success">Kafe</Button>
                <Button variant="success">Supermarket</Button>
                <Button variant="success">Taman Rekreasi</Button>
                <Button variant="success">Theater</Button>
            </Row>
            <Row>
                {/* Actions TEST*/}
                <p>Doing</p>
                <Button variant="success">Makan</Button>
                <Button variant="success">Tidur</Button>
                <Button variant="success">Main</Button>
                <Button variant="success">Belajar</Button>
            </Row>
        </Col>
    </Row>
    );
}

export default Home;