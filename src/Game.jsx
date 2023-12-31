import Pairings from "./Pairings"
import Deals from "./Deals"
import Results from "./Results"
import { useState, useEffect, createContext} from "react"
import { calculate_mean, assign_punctation_to_subdeal, assign_punctation_to_players, zero_punctation } from "./utils/punctation"
import { create_all_pairs } from "./utils/pairings"
export const userContext = createContext()

const Game = ({gamers, rounds, punctation, dealsNumber}) => {

const [pairings, setPairings] = useState({
    0: [[0, 1],[2, 3]]
});

const [isResult, setIsResult] = useState(false);
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
        if(gamers.length % 2){
            gamers.push("DUMMY")
        } 
        //CREATING GAMERS OBJECT
        const round_keys = [...Array(Number(rounds)).keys()]
        const points_vec = round_keys.map(item =>{
            return [item, 0]
        })
        const points_obj = Object.fromEntries(points_vec);
        const gamers_vec = gamers.map((item, idx) =>{
            return [idx, {name: item, points: {...points_obj}}];
        })
        const gamers_obj = Object.fromEntries(gamers_vec);
        setParticipants(prev_participants => gamers_obj);
        
        //CREATING ALL POSSIBLE PAIRS
        const all_pairings = create_all_pairs(Object.keys(gamers))
        console.log(all_pairings);
        setPairings(pairings => all_pairings)

        //CREATE ALL DEALS
        const pairs_in_deals = {}
        const deals_in_round = {}
        const deals_in_game = {}
        const pair_keys = [...Array(Math.floor(gamers.length/4)).keys()]
        const deal_keys = [...Array(Number(dealsNumber)).keys()]
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
        zero_punctation(participants, round)
        const deals_iterator = Object.keys(deals_in_round);
        for (let i of deals_iterator){
            const single_deal = deals_in_round[i];
            const mean = calculate_mean(single_deal);
            for (let j of Object.values(single_deal)){
                if(!Array.isArray(j)){
                    assign_punctation_to_subdeal(j, mean)
                    assign_punctation_to_players(j, pairings, participants, round)
                }
            }
            setDeals(prev_deals => new_deals);   
        }
    }

    const handleClick = (item) =>{
        setActualRound(round => item);
        isResult && setIsResult(result => !result)
    }

    const switchResult = () =>{
        setIsResult(result => !result)
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
            <button onClick={switchResult}>WYNIKI</button>
        </div>
        <div>
        <userContext.Provider value={{handleSingleDeal, changeVulnerability}}>
        {!isResult &&  
            Object.keys(deals).filter(round => round === actualRound).map((round, idx)=>(
                <>
                <div key={idx} className="two_columns">
                <Pairings
                    participants = {participants}
                    pairing = {pairings[round]}
                    actualRound = {actualRound}
                />
            
                <Deals
                    deal = {deals[round]}
                    dealsNumber = {Object.keys(deals[round]).length}
                    actualRound = {actualRound}
                />
                </div>
                <button onClick={() => handlePunctation(actualRound)}>PODLICZ PUNKTY</button>
                </>
            ))
        }
        </userContext.Provider>
        {
            isResult && 
            <Results
                participants = {participants}
            />
        }
        </div>    
    </div>
  )
}

export default Game

