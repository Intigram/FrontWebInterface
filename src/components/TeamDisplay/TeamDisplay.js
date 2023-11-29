import './TeamDisplay.css';
import { Tooltip, OverlayTrigger, Row, Col, Container } from "react-bootstrap";

function TeamDisplay({summonerName, participants, color, ix}) {

    const r = require.context('../../assets/images/ChampIcons', false, /\.(png|jpe?g|svg|webp)$/)
    let images = {};
    r.keys().map((item, index) => { 
        images[item.replace('./', '')] = r(item); 
        // console.log(item)
    });
    // console.log(images)

    let rowClassName = color + 'Row';

    let items = participants.map((d, idx) => {
        let imgClassName = 'champIcon ' + color;
        if (d["summonerName"] === summonerName) {
            imgClassName += ' player ';
        }
        // /Users/rebeca/Documents/Projects/WinPrediction/WebInterface/Front/intigram/src/assets/images/ChampIcons/Aatrox.webp
        // let imSrc = './assets/images/ChampIcons/' + d["championName"] + '.webp';
        // const im = require(imSrc)
        const im = images[d["championName"] + ".webp"]

        return (
            <Col color={color} md="auto" key={d["championName"]+idx+ix+"col"}>
                <OverlayTrigger 
                    delay={{ hide: 450, show: 300 }} 
                    overlay={(props) => ( 
                    <Tooltip {...props}> 
                        {d["championName"] + " "} 
                        ({d["summonerName"]})
                    </Tooltip> 
                    )} 
                    placement="bottom"
                >
                    <span className={imgClassName}>
                        <img
                        src={im} 
                        alt={d["championName"]} 
                        ></img>
                    </span>
                </OverlayTrigger>
            </Col>
        )
    });

    return (
        <Container className={rowClassName} key={'cont_'+color+ix}>
            <Row className={rowClassName}>
                {items}
            </Row>
        </Container>
    )
}

export default TeamDisplay;