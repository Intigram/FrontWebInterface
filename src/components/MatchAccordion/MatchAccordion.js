import './MatchAccordion.css';
import { Accordion, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPoo, faXmark, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import TeamDisplay from '../TeamDisplay/TeamDisplay';
import MatchPlot from '../MatchPlot/MatchPlot';

function MatchAccordion({summonerName, matchIds, matches, timelines, predictions, page}) {
    
    // console.log(matches)

    let items = matches.map((d, idx) => {
        if (idx >= (page-1)*20 && idx < page*20) {
            // console.log(d)
            let participants = d["participants"]
            let blue = []; let red = [];
            let didWin = false
            let wasRemake = false
            for (const element of participants) {
                const player = element;
                if (player["summonerName"] === summonerName && player["win"]) {
                    didWin = true
                    if (player["gameEndedInEarlySurrender"]) {
                        wasRemake = true
                    }
                }
                if (player["teamId"] === 100) {
                    blue.push(player)
                }
                else {
                    red.push(player)
                }
            }
            let getWinPartIcon = (didWin) => {
                return (
                didWin && !wasRemake ? 
                <div className='winPart win'>
                    <FontAwesomeIcon icon={faFaceSmile} />
                </div>
                :( wasRemake ?
                <div className='winPart remake'>
                    <FontAwesomeIcon icon={faRotateRight} />
                </div>
                :
                <div className='winPart loss'>
                    <FontAwesomeIcon icon={faPoo} />
                </div>))
            }
            let getWinPartText = (didWin) => {
                return (
                didWin && !wasRemake ? 
                <div className='winPart win text-center'>
                    Win
                </div>
                :( wasRemake ?
                <div className='winPart remake text-center'>
                    Remake
                </div>
                :
                <div className='winPart loss text-center'>
                    Loss
                </div>))
            }

            return (
                <Accordion.Item eventKey={matchIds[idx]} key={'AccordionItem'+idx}>
                    <Accordion.Header>
                        {predictions[idx] !== 'Not CLASSIC' ?
                            (
                            <Row className="justify-content-md-center text-center match-row">
                                <Col className='test-col my-auto' xs={1}>{getWinPartIcon(didWin)}</Col>
                                <Col className='test-col my-auto' xs={2}>{getWinPartText(didWin)}</Col>
                                <Col className='test-col my-auto' xs={4}>
                                    <TeamDisplay
                                    summonerName={summonerName}
                                    participants={blue}
                                    color={"blue"}
                                    idx={idx}
                                    />
                                </Col>
                                <Col className='test-col my-auto' xs={1} style={{
                                    "marginLeft": "-1vw",
                                    "marginRight": "-1vw"}}
                                ><FontAwesomeIcon icon={faXmark} /></Col>
                                <Col className='test-col my-auto' xs={4}>
                                    <TeamDisplay
                                    summonerName={summonerName}
                                    participants={red}
                                    color={"red"}
                                    idx={idx}
                                    />
                                </Col>
                            </Row>) :
                            (<Container className='text-center'>
                                <h5>Not SoloQ</h5>
                            </Container>)
                        }
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container className='AccordionBody'>
                            {predictions[idx] !== 'Not CLASSIC' ?
                            (<MatchPlot
                                timeline={timelines[idx]}
                                preds={predictions[idx]}
                                idx={idx}
                            ></MatchPlot>) :
                            (<p>Likely arena mode</p>)
                            }
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            )
        }
    });

  return (
    <div className='MatchAccordion align-items-center w-100'>
        <Accordion>
            {items}
        </Accordion>
    </div>
  );
}

export default MatchAccordion;