import React, {useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function GameOver(props)
{
    function setMainBG() {
        if(!props.isBusy)
        {
            if(props.day === 7)
            {
                document.getElementsByTagName("BODY")[0].setAttribute("style","background-image: url('images/background/adios.png')");
            }
            else if(props.secretEnd)
            {
                document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/secret.gif')");
            }
            else
            {
                document.getElementsByTagName("BODY")[0].setAttribute("style", "background-image: url('images/background/MainMenu.png')");
            }
        }
    }

    useEffect(() => {
        const bg = setInterval(() => {
          setMainBG();
        }, 1);
    
        return () => {
          clearInterval(bg);
        };
    }, []);

    function credit()
    {
        document
            .getElementsByTagName("BODY")[0]
            .setAttribute(
              "style",
              "background-image: url('/images/background/MainMenu.png')"
            );
        props.playMode("credits");
    }

    return(<Col>
    <Row id="keluar">
        <Button variant="warning" onClick={credit}>Credits</Button>
    </Row>
    <Row>
        <img id="avatar" src={props.avatar} alt={props.avatar} />
    </Row>
    </Col>)
}

export default GameOver;