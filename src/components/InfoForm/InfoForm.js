import './InfoForm.css';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import config from '../../config';

function InfoForm({summonerName, region, apiKey, setTimelines, setPredictions, setPage, 
    setStage, setSummonerName, setRegion, setMatches, setMatchIds}) {

    const regionOptions = config["regionOptions"]
    const regionDict = config["regionDict"]

    const options = regionOptions.map((d) => {
        return (
            <option value={d.short.toLowerCase()} key={d.short.toLowerCase()}>{d.short}</option>
        )
    });

    const handleClick = (e) => {
        e.preventDefault()
        setStage("loading")
        setPage(0)
        setMatchIds([])
        setMatches([])
        setTimelines([])
        setPredictions([])
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "X-Riot-Token": apiKey
        };
        let params = {
            "summonerName": encodeURIComponent(summonerName),
            "startFrom": 0,
            "regionLong": regionDict[region.toUpperCase()],
            "regionShort": region
        }
        // alert(JSON.stringify(params))

        axios.post(
            "http://127.0.0.1:5000/api/matches", params, { headers: headers }
        )
        .then((res) => {
            console.log(res)
            setStage("loaded")
            setMatches(res.data['matches'])
            setMatchIds(res.data['matchIds'])
            setTimelines(res.data['matchTimelines'])
            setPredictions(res.data['predictions'])
            setPage(1)
        }).catch(function(error) {
            setStage(error['response']['data'])
            console.error(error['response']['data'])
        });
    }
  return (
    <div className='InfoForm'>
        <h4>Enter info here to get match history:</h4>
        <Form className='mt-4'>
        <Form.Group className="mb-3" controlId="formSummonerName">
            <Form.Label>Summoner Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Summoner Name" value={summonerName} 
            onChange={(e) => setSummonerName(e.currentTarget.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRegion">
        <Form.Label>Region</Form.Label>
            <Form.Control
            aria-label="Region"
            as="select"
            type="select"
            value={region}
            onChange={(e) => setRegion(e.currentTarget.value)}
            >
                {options}
            </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleClick}>
            Get match history
        </Button>
        </Form>
    </div>
  );
}

export default InfoForm;