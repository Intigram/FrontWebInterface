import angry from './assets/images/angry_logo.png';
import './App.css';
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoForm from './components/InfoForm/InfoForm';
import MatchHist from './components/MatchHist/MatchHist';
import ak from "./api";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion]             = useState("");
  const apiKey                          = ak;
  const [matchIds, setMatchIds]         = useState([]);
  const [matches, setMatches]           = useState([]);
  const [timelines, setTimelines]       = useState([]);
  const [stage, setStage]               = useState("No matches retrieved")
  const [page, setPage]                 = useState(0);
  const [predictions, setPredictions]   = useState([]);

  return (
    <div className="App align-items-center w-100">
      <header className="App-header container mb-2">
        <Row className='justify-content-md-center align-items-center'>
          <Col md="auto">
            <img src={angry} className='App-logo' alt='logo' />
          </Col>
          <Col md="auto" className='align-items-center mt-2'>
            <h1 className="text-outline app-title">
              <b>Intigram</b>
            </h1>
          </Col>
        </Row>
        <Row className='justify-content-md-center align-items-center'>
          <h6>The statistical way to show how hard your team inted in LoL</h6>
        </Row>
      </header>

      <Container>
        <Row>
          <Col>
            <InfoForm //
              summonerName={summonerName}
              region={region}
              apiKey={apiKey}
              setTimelines={setTimelines}
              setPage={setPage}
              setStage={setStage}
              setSummonerName={setSummonerName}
              setRegion={setRegion}
              setMatches={setMatches}
              setMatchIds={setMatchIds}
              setPredictions={setPredictions}
            ></InfoForm>
          </Col>
          <Col  xs={9}>
            <MatchHist  //
              summonerName={summonerName}
              region={region}
              apiKey={apiKey}
              matches={matches}
              stage={stage}
              page={page}
              matchIds={matchIds}
              setPage={setPage}
              setStage={setStage}
              setMatches={setMatches}
              setMatchIds={setMatchIds}
              timelines={timelines}
              setTimelines={setTimelines}
              predictions={predictions}
              setPredictions={setPredictions}
            ></MatchHist>
          </Col>
        </Row>
      </Container>

      <footer className='footer small'>
        Created by{' '}
        <a href="https://github.com/chiniczR" className='no_under'>
          Rebeca Chinicz <FontAwesomeIcon icon={faGithub} />
        </a>
      </footer>
    </div>
  );
}

export default App;
