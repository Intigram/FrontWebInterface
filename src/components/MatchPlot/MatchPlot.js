import './MatchPlot.css';
import React from 'react';
import Plot from 'react-plotly.js';
// import { Tooltip, OverlayTrigger, Row, Col, Container } from "react-bootstrap";
import config from '../../config';

function MatchPlot({timeline, preds, idx}) {

    const getTimestamps = (timeline) => {
        let stamps = [];
        for (let frame of timeline["frames"]) {
            stamps.push(frame["timestamp"]/1000/60)
        }
        return stamps
    }

    const getBluePreds = (preds) => {
        let bp = [];
        preds[0][0] = 0.5;  // start will always be 50-50
        for (let p of preds) {
            bp.push(p[0]*100)
        }
        return bp
    }

    const getRedPreds = (preds) => {
        let rp = [];
        preds[0][1] = 0.5;  // start will always be 50-50
        for (let p of preds) {
            rp.push(p[1]*100)
        }
        return rp
    }

    const getImgs = (timeline) => {
        let finalTime = 0
        for (let ts of timeline["frames"]) {
            if (ts["timestamp"] > finalTime) {
                finalTime = ts["timestamp"]
            }
        }

        let ims = []
        for (let ts of timeline["frames"]) {
            // console.log(ts["events"])
            for (let event of ts["events"]) {
                let url = ''
                let toAdd = false
                let team = 'blue'
                let dotUrl = ''

                if (event["type"] === "ELITE_MONSTER_KILL") {
                    team = event['killerId'] < 6 ? 'blue' : 'red'
                    if (event["monsterType"] === "DRAGON") {
                        url = config["lol_images"][team][event['monsterSubType']]
                        // console.log(url)
                    }
                    else {
                        url = config["lol_images"][team][event['monsterType']]
                    }
                    toAdd = true
                    dotUrl = team==='blue'? 'https://img.icons8.com/ios-glyphs/30/228BE6/sphere.png' 
                                            : 'https://img.icons8.com/ios-glyphs/30/FA5252/sphere.png'
                }
                else if (event["type"] === "BUILDING_KILL") {
                    // get the team that lost the structure (so we dislpay the team's structure)
                    team = event["teamId"] === 100 ? 'blue' : 'red'
                    url = config["lol_images"][team][event["buildingType"]]
                    // change it so we get a dot displaying the team that got it (not lost it) 
                    dotUrl = team==='red'? 'https://img.icons8.com/ios-glyphs/30/228BE6/sphere.png' 
                                            : 'https://img.icons8.com/ios-glyphs/30/FA5252/sphere.png'
                    toAdd = true
                }

                if (toAdd) {
                    ims.push({
                        x: event["timestamp"]/finalTime,
                        y: 0.49,
                        sizex: 0.055,
                        sizey: 0.055,
                        source: url,
                        xanchor: "right",
                        xref: "paper",
                        yanchor: "bottom",
                        yref: "paper"
                      })
                    ims.push({
                        x: event["timestamp"]/finalTime,
                        y: 0.44,
                        sizex: 0.05,
                        sizey: 0.05,
                        source: dotUrl,
                        xanchor: "right",
                        xref: "paper",
                        yanchor: "bottom",
                        yref: "paper"
                        })
                }
            }
        }

        return ims
    }

    const trace1 = {
        x: getTimestamps(timeline),
        y: getBluePreds(preds),
        fill: 'tozeroy',
        type: 'scatter',
        fillcolor: 'rgba(3, 161, 251, 0.5)',
        hoveron: 'points',
        line: {
        color: 'blue'
        },
        name: 'Blue Side'
      };
      
    const trace2 = {
        x: getTimestamps(timeline),
        y: getRedPreds(preds),
        fill: 'tozeroy',
        type: 'scatter',
        fillcolor: 'lightred',
        hoveron: 'points',
        line: {
        color: 'red'
        },
        xaxis: 'x',
        yaxis: 'y2',
        name: 'Red Side'
      };

    return (
        // <>
        <Plot key={'Plot'+idx}
            data={[trace1, trace2]}
            layout={ {grid: {
                rows: 2,
                columns: 1,
                subplots: [['xy'], ['xy2']]},
                images: getImgs(timeline),
                annotations: [{
                    xref: 'paper',
                    yref: 'paper',
                    x: 0,
                    xanchor: 'left',
                    y: 0.49,
                    yanchor: 'bottom',
                    text: 'Objective:',
                    showarrow: false
                  }, {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0,
                    xanchor: 'left',
                    y: 0.43,
                    yanchor: 'bottom',
                    text: 'Team that got it:',
                    showarrow: false
                  }],
                width: 875, height: 400, title: 'Win Probabilty through Match Timeline', autosize: true, 
                yaxis: {range: [50, 100], title: 'Win Probability [%]'}, yaxis2: {range: [100, 50]},
                xaxis: {title: 'Match Time [min]'}
            }}
        />
        // {/* <h6>Timestamps: {getTimestamps(timeline).length}</h6> */}
        // </>
    )
}

export default MatchPlot