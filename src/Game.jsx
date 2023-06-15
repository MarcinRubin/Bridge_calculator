import Pairings from "./Pairings"
import Deals from "./Deals"
import { useState, useEffect, createContext} from "react"
export const userContext = createContext()

const Game = ({gamers, rounds, punctation, dealsNumber}) => {

const [pairings, setPairings] = useState({0: [[0, 1],[2, 3]]});
const [actualRound, setActualRound] = useState("0")
const [participants, setParticipants] = useState({
        0: {
            name: '',
            points: {0: 0}
        },
        1: {
            name: '',
            points: {0: 0}
        },
        2: {
            name: '',
            points: {0: 0}
        },
        3: {
            name: '',
            points: {0: 0}
        }
    });

    const [deals, setDeals] = useState({
        0: {
            0: {
                0: {
                    "NS": '',
                    "EW": '',
                    "RG": '',
                    "KONT": '',
                    "WYN": '',
                    "NS_WYN": '',
                    "EW_WYN": '',
                    "NS_ZAP": '',
                    "EW_ZAP": '',
                    "LEW": ''
                },
                'vulnerable': [false, false] 
            }
        }
    });
    
    
    useEffect(() => {
        //CREATING GAMERS OBJECT
        if(gamers.length % 2){
            gamers.push("DUMMY")
        }

        const round_keys = [...Array(Number(rounds)).keys()]
        const points_vec = round_keys.map(item =>{
            return [item, 0]
        })
        const points_obj = Object.fromEntries(points_vec);
        console.log(points_obj);
        
        const gamers_vec = gamers.map((item, idx) =>{
            return [idx, {name: item, points: {...points_obj}}];
        })
        const gamers_obj = Object.fromEntries(gamers_vec);
        setParticipants(prev_participants => gamers_obj);
        console.log(gamers_obj);
        
        //CREATING ALL POSSIBLE PAIRS
        console.log(gamers);
        const all_pairings = create_all_pairs([...Array(gamers.length).keys()])
        console.log(all_pairings);
        setPairings(pairings => all_pairings)

        //CREATE ALL DEALS
        const pairs_in_deals = {}
        const deals_in_round = {}
        const deals_in_game = {}
        const pair_keys = [...Array(Math.floor(gamers.length/4)).keys()]
        const deal_keys = [...Array(Number(dealsNumber)).keys()]
        //const round_keys = [...Array(Number(rounds)).keys()]
        for (let i of pair_keys){
            pairs_in_deals[i] = {
                "NS": 2 * i + 1,
                "EW": 2 * i + 2,
                "RG": '',
                "KONT": '',
                "LEW" : '',
                "WYN": '',
                "NS_WYN": '',
                "NS_ZAP": '',
                "EW_ZAP": '',
                "EW_WYN": '',
            }
        }
        for (let i of deal_keys){
            const temp_pairs = JSON.parse(JSON.stringify(pairs_in_deals))
            deals_in_round[i] = {...temp_pairs, 'vulnerable': [false, false] }
            
        }
        for (let i of round_keys){
            const temp_deals = JSON.parse(JSON.stringify(deals_in_round))
            deals_in_game[i] = {...temp_deals}
        }
        setDeals(deals => deals_in_game)
        
    }, []);

    const create_all_pairs = (arr) =>{
        const all_gamers = arr.length
        let row1 = arr.splice(0, Math.floor(arr.length) / 2);
        let pairs = {
            0: row1.map((item, idx) => {
                return [item, arr[idx]]
            })
        };
        for (let i = 1; i < all_gamers - 1; i++){
            let to_move = row1[row1.length - 1] ;
            row1 = [arr[0], ...row1.splice(0, row1.length - 1)]
            arr = [...arr.splice(1, arr.length - 2), to_move, arr[arr.length - 1]]
            //CREATE NEW PAIRING
            pairs[i] = row1.map((item, idx) => {
            return [item, arr[idx]];
            })
        }
        console.log(pairs);
        return pairs;
    }

    const handleSingleDeal = (round, dealNumber, subdeal_number, userInput) =>{
        const temp_deals = {...deals}
        temp_deals[round][dealNumber][subdeal_number] = {...userInput} 
        setDeals(old_deals => temp_deals)
    }

    const changeVulnerability = (round, dealNumber, vul) =>{
        const new_deals = {...deals};
        new_deals[round][dealNumber] = {...new_deals[round][dealNumber], 'vulnerable': vul};
        setDeals(old_deals => new_deals);
    }

    const handlePunctation = (round) =>{
        const new_deals = {...deals}
        const deals_in_round = new_deals[round]
        const deals_iterator = Object.keys(deals_in_round);
        for (let i of deals_iterator){
            const single_deal = deals_in_round[i];
            let mean = 0;
            for (let j of Object.values(single_deal)){ 
                if(!Array.isArray(j)){
                    mean += j.NS_ZAP;
                    
                    mean -= Number(j.EW_ZAP);
                }
            }
            mean /= (Object.values(single_deal).length-1);
            mean = Math.floor(mean / 10) * 10;
            console.log(`Mean was ${mean}`);
            for (let j of Object.values(single_deal)){ 
                if(!Array.isArray(j)){
                    if(Number(j.NS_ZAP) > Number(j.EW_ZAP)){
                        if( (j.NS_ZAP - mean) < 0){
                            j.NS_WYN = (-toIMP(mean-j.NS_ZAP)).toFixed(2);
                        }
                        else j.NS_WYN = toIMP(j.NS_ZAP - mean).toFixed(2);
                        j.EW_WYN = (-j.NS_WYN).toFixed(2);
                        const player1 = pairings[0][Number(j.NS)-1][0];
                        const player2 = pairings[0][Number(j.NS)-1][1];
                        const player3 = pairings[0][Number(j.EW)-1][0];
                        const player4 = pairings[0][Number(j.EW)-1][1];
                        participants[player1].points[round] = Number(participants[player1].points[0]) + Number(j.NS_WYN);
                        participants[player2].points[round] = Number(participants[player2].points[0]) + Number(j.NS_WYN);
                        participants[player3].points[round] = Number(participants[player3].points[0]) - Number(j.NS_WYN);
                        participants[player4].points[round] = Number(participants[player4].points[0]) - Number(j.NS_WYN);

                    }
                    else{
                        if(j.EW_ZAP + mean < 0){
                            j.EW_WYN = (-toIMP(-j.EW_ZAP - mean)).toFixed(2);
                        }
                        else j.EW_WYN = toIMP(j.EW_ZAP + mean).toFixed(2);
                        j.NS_WYN = (-j.EW_WYN).toFixed(2);
                    }
                }
                setDeals(prev_deals => new_deals);   
            }
        }
    }

    const toIMP = (result) => {
        if(result >= 0 && result <= 10) return 0;
        if(result >= 20 && result <= 40) return 1;
        if(result >= 50 && result <= 80) return 2;
        if(result >= 90 && result <= 120) return 3;
        if(result >= 130 && result <= 160) return 4;
        if(result >= 170 && result <= 210) return 5;
        if(result >= 220 && result <= 260) return 6;
        if(result >= 270 && result <= 310) return 7;
        if(result >= 320 && result <= 360) return 8;
        if(result >= 370 && result <= 420) return 9;
        if(result >= 430 && result <= 490) return 10;
        if(result >= 500 && result <= 590) return 11;
        if(result >= 600 && result <= 740) return 12;
        if(result >= 750 && result <= 890) return 13;
        if(result >= 900 && result <= 1090) return 14;
        if(result >= 1100 && result <= 1290) return 15;
        if(result >= 1300 && result <= 1490) return 16;
        if(result >= 1500 && result <= 1740) return 17;
        if(result >= 1750 && result <= 1990) return 18;
        if(result >= 2000 && result <= 2240) return 19;
        if(result >= 2250 && result <= 2490) return 20;
        if(result >= 2500 && result <= 2990) return 21;
        if(result >= 3000 && result <= 3490) return 22;
        if(result >= 3500 && result <= 3990) return 23;
        if(result >= 4000)  return 24;
    }

    const handleClick = (item) =>{
        setActualRound(round => item);
    }

    return (
    <div>
        <div className="upper_ui_row">
            {  
                Object.keys(deals).map((item, idx)=>(
                    <button key={idx} onClick={() => handleClick(item)}>
                        Runda {idx + 1}
                    </button>
                ))
            }
        </div>
        <div>
        <userContext.Provider value={{handleSingleDeal, changeVulnerability}}>
        {  
            Object.keys(deals).filter(item => item === actualRound).map((item, idx)=>(
                <>
                <div key={idx} className="two_columns">
                <Pairings
                    participants = {participants}
                    pairing = {pairings[item]}
                    actualRound = {actualRound}
                />
            
                <Deals
                deal = {deals[item]}
                dealsNumber = {Object.keys(deals[item]).length}
                actualRound = {actualRound}
                />
                </div>
                <button onClick={() => handlePunctation(actualRound)}>Generate</button>
                </>
            ))
        }
        </userContext.Provider>
        



        </div>
        
    </div>
  )
}

export default Game

