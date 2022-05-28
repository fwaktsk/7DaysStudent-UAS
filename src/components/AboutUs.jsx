import Button from "react-bootstrap/Button";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import members from '../db/memberlist';

function AboutUs()
{

    function Avatar(details) {
        return <img className="profpic" src={details.img} alt="avatar_img" />;
    }

    function Detail(props) {
        return <p className="contact">{props.info}</p>;
    }

    function Card(details) {
        return (
          <div className="card">
            <div className="name">
              <h2>{details.name}</h2>
              <Avatar img={details.imgURL} />
            </div>
            <div className="data">
              <Detail info={details.tel} />
              <Detail info={details.email} />
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
            tel={member.phone}
            email={member.email}
          />
        );
      }


    return <Col>
    <Row>
        <Button variant="danger" id="keluar">Exit</Button>
    </Row>
    <Row id="cardContainer">
        {members.map(createCard)}
    </Row>
    </Col>;
}

export default AboutUs;