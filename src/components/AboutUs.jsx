import Button from "react-bootstrap/Button";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import members from '../db/memberlist';

function AboutUs(props)
{

    function Avatar(details) {
        return <img className="profpic" src={details.img} alt="avatar_img" />;
    }

    function Detail(data) {
        return <p className="contact">{data.info}</p>;
    }

    const exit = ()=>{props.playMode("setup")}

    function Card(details) {
        return (
          <div className="card">
            <div className="name">
              <h2>{details.name}</h2>
              <Avatar img={details.imgURL} />
            </div>
            <div className="data">
              <Detail info={"NIM : "+details.nim} />
              <Detail info={"Email : "+details.email} />
            </div>
          </div>
        );
    }

    function createCard(member) {
        return (
          <Card
            key={member.id}
            name={member.name}
            imgURL={member.imgURL}
            nim={member.nim}
            email={member.email}
          />
        );
      }


    return <Col>
    <Row id="keluar">
        <Button variant="danger" onClick={exit}>Exit</Button>
    </Row>
    <Row id="cardContainer">
        {members.map(createCard)}
    </Row>
    </Col>;
}

export default AboutUs;