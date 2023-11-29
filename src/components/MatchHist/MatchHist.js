import './MatchHist.css';
import { ButtonGroup, Button, Container, Alert, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import MatchAccordion from '../MatchAccordion/MatchAccordion';
import config from '../../config';
import axios from "axios";

function MatchHist({summonerName, region, apiKey, matches, matchIds, stage, page,
    setPage, setStage, setMatches, setMatchIds, 
    timelines, setTimelines, predictions, setPredictions}) {

    const regionDict = config["regionDict"]

    // check if we should vertically align a message in the match panel
    // (only if we haven't loaded matches yet)
    let check = (stage) => {
        let insideDivClass = 'vertical-center';
        if (stage === 'loaded'){
            insideDivClass = '';
        }
        return insideDivClass
    }

    let containerClass = (stage) => {
        let cclass = 'MatchPanel align-items-center justify-content-center text-center'
        if (stage === 'loaded'){
            cclass = 'MatchPanelNot align-items-center justify-content-center text-center';
        }
        return cclass
    }

    // calc showing - we retrieve 20 per call
    let showing = (page) => {
        if (page === 0) {
            return "None"
        }
        return String((page-1)*20+1) + "-" + String(page*20);
    }

    // check if show disable next and previous btns
    let checkPrev = (page) => {
        return page < 2 || stage === 'loading'
    }
    let cehckNext = (page) => {
        return page < 1 || stage === 'loading'
    }

    // what to return depending on stage
    let content = (stage) => {
        if (stage === 'loaded') {                       // If we have loaded matches
            return (
            <MatchAccordion
                summonerName={summonerName}
                matches={matches}
                matchIds={matchIds}
                timelines={timelines}
                predictions={predictions}
                page={page}
            ></MatchAccordion>)
        }
        else if (stage !== 'No matches retrieved' && stage !== 'loading') {    // If it's an error we got
            return (
                <Container><Row className='justify-content-center'>
                    <Alert key="danger" variant="danger">
                        {stage}
                    </Alert>
                </Row></Container>
            )
        }
        else if (stage === 'loading') {    // If we're loading matches (or trying to)
            return (
                <Container><Row className='justify-content-center'>
                    <Alert key="light" variant="light">
                        <Spinner animation="border" /><p></p>
                        <small>Loading, please wait ...</small>
                    </Alert>
                </Row></Container>
            )
        }
        return stage
    }

    const handlePrevClick = (e) => {
        e.preventDefault()
        setPage(--page)
    }

    const handleNextClick = (e) => {    // for next click
        e.preventDefault()
        // if it's a page we've already loaded
        if (page+1 <= matches.length/20) {
            setPage(++page);
        }
        // if we don't yet have those matches
        else if (page+1 > matches.length/20) {
            setStage("loading")
            let headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "X-Riot-Token": apiKey
            };
            let params = {
                "summonerName": encodeURIComponent(summonerName),
                "startFrom": matches.length,
                "regionLong": regionDict[region.toUpperCase()],
                "regionShort": region
            }
            // alert(JSON.stringify(params))

            axios.post(
                "http://127.0.0.1:5000/api/matches", params, { headers: headers }
            )
            .then((res) => {
                setStage("loaded")
                setMatches(matches => [...matches, ...res.data['matches']])
                setMatchIds(matchIds => [...matchIds, ...res.data['matchIds']])
                setTimelines(timelines => [...timelines, ...res.data['matchTimelines']])
                setPredictions(predictions => [...predictions, ...res.data['predictions']])
                setPage(++page)
            }).catch(function(error) {
                alert(error['response']['data'])
                setStage("loaded")
                console.error(error['response']['data'])
            });
        }
    }

  return (
    <div className='MatchHist align-items-center w-100'>
        <Container className={containerClass(stage)}>
            <div className={check(stage)}>{content(stage)}</div>
        </Container>
        <ButtonGroup className="me-2" aria-label="Page control buttons">
            <Button disabled={checkPrev(page)} onClick={handlePrevClick}>
                <FontAwesomeIcon icon={faCaretLeft} />
            </Button>
            <Button className='page-cntr' disabled>{
                stage === 'loading' ?
                'Currently loading ' + showing(page+1) + '. Please wait...'
                : 'Currently showing: ' + showing(page)
            }</Button>
            <Button disabled={cehckNext(page)}><
                FontAwesomeIcon icon={faCaretRight} onClick={handleNextClick} />
            </Button>
        </ButtonGroup>
    </div>
  );
}

export default MatchHist;