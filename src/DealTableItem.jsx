import { useState, useEffect, useContext } from "react"
import {userContext} from "./Game";


const DealTableItem = ({actualRound, dealNumber, subdeal_number, subdeal, vul}) => {
  const {handleSingleDeal} = useContext(userContext);
  const [userInput, setUserInput] = useState({
    KONT: '',
    RG: '',
    LEW: ''
  })

  useEffect(() => {
    const new_userInput = {
    KONT: subdeal.KONT,
    RG: subdeal.RG,
    LEW: subdeal.LEW
    };
    setUserInput(prevState=> new_userInput);
  }, [actualRound])


  const handleContract = (e) =>{
    e.preventDefault()
    const user = {...userInput};
    user.KONT = e.target.value;
    setUserInput(user);
  }

  const handlePlayer = (e) =>{
    const user = {...userInput}
    user.RG = e.target.value
    setUserInput(user)
  }


  const handleResult = (e) => {
    const user = {...userInput}
    user.LEW = e.target.value
    setUserInput(user)
  }

  const handleSubmit = () => {
    let deal_state = {}
    try{
        const contract = checkValidity()
        const player = checkPlayer()
        const takes = checkTakes(Number(contract.level))
        deal_state = {...contract, ...player, "takes": takes}
    }
    catch(err){
        //Tutaj dorzucic podwietlanie elementow intefejsu, gdzie zle wpisane
        console.log(err)
        return
    }
    //Nieugrane
  if(Number(deal_state.takes) < 0) handleLoose(deal_state);
  else handleWin(deal_state) 
}

  const checkValidity = () => {
    const word = userInput.KONT
    const numbers = ['1', '2', '3', '4', '5', '6', '7'];
    const suits = ['C', 'D', 'H', 'S'];
    let checker = {};
    
    if ( !numbers.includes(word[0]) ) throw "ERROR"
    checker = {...checker, "level": word[0]}
    let counter_pos = 2
    if ( suits.includes(word[1]) ) checker = {...checker, "suit": word[1]}
    else{
        if( (word[1] + word[2]) !== 'NT') throw "ERROR2"
        checker = {...checker, suit: 'NT'}
        counter_pos = 3
    }
    if(word.length === counter_pos) return {...checker, "state": "normal"}
    if( word[counter_pos] !== 'X' ) throw "ERROR3"
    counter_pos += 1
    if( word.length === counter_pos) return {...checker, "state":"double"}
    if( word[counter_pos] !== 'X' ) throw "ERROR4"
    if(word.length > counter_pos + 1) throw "ERROR5"
    return {...checker, "state": 'redouble'}
}

const checkPlayer = () => {
  const players = ["N", "S", "E", "W"]
  if (players.includes(userInput.RG)){
    if(userInput.RG === 'N' || userInput.RG === 'S') return {"player": userInput.RG, "vul": vul[0]}
    else return {"player": userInput.RG, "vul": vul[1]}
  } 
  throw "ERROR6"
};

const checkTakes = (contract) => {
  if (userInput.LEW >= -(contract + 6) && userInput.LEW <= 7 - contract) return userInput.LEW
  throw "ERROR7"
};

const handleLoose = (deal_state) => {
  let result = 0;
  if(deal_state.state ==="normal"){
    result = 50 - 50 * (Number(deal_state.takes) + 1);
    if(deal_state.vul) result *= 2;
  }
  if(deal_state.state ==="double"){
    if(deal_state.vul) {
      result = 200 - 300 * (Number(deal_state.takes) + 1);
    }
    else{
      if(Number(deal_state.takes) > -3) result = 100 - 200 * (Number(deal_state.takes) + 1)
      else result = 100 - 300 * (Number(deal_state.takes) + 1) - 200
    }
  }
  if(deal_state.state ==="redouble"){
    if(deal_state.vul) {
      result = 400 - 600 * (Number(deal_state.takes) + 1);
    }
    else{
      if(Number(deal_state.takes) > -3) result = 200 - 400 * (Number(deal_state.takes) + 1)
      else result = 200 - 600 * (Number(deal_state.takes) + 1) - 400
    }
    result = 200 - 400 * (Number(deal_state.takes) + 1)
    if(deal_state.vul) result = 400 - 600 * (Number(deal_state.takes) + 1);
  }

  if(['N', 'S'].includes(deal_state.player)){
    const to_change = {...subdeal, ...userInput, EW_ZAP: result, NS_ZAP: 0}
    handleSingleDeal(actualRound, dealNumber, subdeal_number, to_change)
  }
  else{
    const to_change = {...subdeal, ...userInput, NS_ZAP: result, EW_ZAP: 0}
    handleSingleDeal(actualRound, dealNumber, subdeal_number, to_change)
  }
}

const handleWin = (deal_state) => {
  let result = 0
  if (['C', 'D'].includes(deal_state.suit)){
    result = Number(deal_state.level) * 20
  }
  if (['H', 'S'].includes(deal_state.suit)){
    result = Number(deal_state.level) * 30
  }
  if(deal_state.suit === 'NT'){
    result = 40 + (Number(deal_state.level)-1) * 30
  }
  if(deal_state.state === "double") result *= 2
  if(deal_state.state === "redouble") result *= 4
  if(result < 100) result += 50
  else{
    if(deal_state.vul) result += 500 
    else result += 300
  }

  if(deal_state.state === "double") {
    if(deal_state.vul) result += 200 * Number(deal_state.takes)
    else result += 100 * Number(deal_state.takes)
    result += 50
  }
  else if(deal_state.state === "redouble") {
    if(deal_state.vul) result += 400 * Number(deal_state.takes)
    else result += 200 * Number(deal_state.takes)
    result += 100
  }
  else{
    if (['C', 'D'].includes(deal_state.suit)){
      result += 20 * deal_state.takes
    }
    if (['H', 'S', 'NT'].includes(deal_state.suit)){
      result += 30 * deal_state.takes
    }
  }

  if(deal_state.level === "6"){
    if(deal_state.vul) result += 750
    else result += 500
  }
  if(deal_state.level === "7"){
    if(deal_state.vul) result += 1500
    else result += 1000
  }

  if(['N', 'S'].includes(deal_state.player)){
    const to_change = {...subdeal, ...userInput, NS_ZAP: result, EW_ZAP: 0}
    handleSingleDeal(actualRound, dealNumber, subdeal_number, to_change)
  }
  else{
    const to_change = {...subdeal, ...userInput, NS_ZAP: 0, EW_ZAP: result}
    handleSingleDeal(actualRound, dealNumber, subdeal_number, to_change)
  }
}

  
  return (
    <>
        <tr>
              <td>{subdeal.NS}</td>
              <td>{subdeal.EW}</td>
              <td>
                <input type="text" maxLength={5} value={userInput.KONT}
              onChange = {handleContract}/>
              </td>
              <td>
                <input type="text" maxLength={1} value={userInput.RG} onChange = {handlePlayer}/>
              </td>
              <td>
                <input type="text" maxLength={3} value={userInput.LEW} onChange = {handleResult}/>
              </td>
              <td>{subdeal.NS_ZAP}</td>
              <td>{subdeal.EW_ZAP}</td>
              <td>{subdeal.NS_WYN}</td>
              <td>{subdeal.EW_WYN}</td>
              <td><button onClick = {handleSubmit}>OK</button></td>
            </tr>
    </>
  )
}

export default DealTableItem