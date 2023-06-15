import React from "react";
import { useState, useEffect } from "react";

const Pairings = ({participants, pairing, actualRound}) => {
    
    console.log(participants);
    const [pairs, setPairs] = useState(pairing);
    const [restingPlayer, setRestingPlayer] = useState('');

    useEffect(() =>{
        const temp = Object.keys(pairing)
        if(temp.length % 2){
            setRestingPlayer(participants[Number(pairing[pairing.length - 1][0])].name);
            const truncated_pairing = [...pairing];
            truncated_pairing.pop();
            setPairs(prev_pairs => truncated_pairing)
        }
        else setPairs(prev_pairs => pairing)
    }, [pairing])
  
    return (
    <div className="pairing_table">
        <table>
            <thead>
                <tr>
                    <td>NO</td>
                    <td>PAIR</td>
                    <td>PTS</td>
                </tr>
            </thead>
            <tbody>
                {
                    pairs.map( (item, idx) => (
                        <React.Fragment key={idx}>
                            <tr>
                                <td rowSpan={2}>{idx + 1}</td>
                                <td>{participants[item[0]].name}</td>
                                <td rowSpan={2}>{participants[item[1]].points[actualRound]}</td>
                            </tr>
                            <tr>
                                <td>{participants[item[1]].name}</td>
                            </tr>
                        </React.Fragment>
                    ))
                }
                {restingPlayer && (
                    <tr>
                        <td style={{color: 'red'}}>REST</td>
                        <td>{restingPlayer}</td>
                        <td>punkty</td>
                    </tr>
                )}

                


            </tbody>
        </table>
    </div>
  )
}

export default Pairings