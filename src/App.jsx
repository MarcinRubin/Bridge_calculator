import { useState } from 'react'
import Setup from './Setup'
import Game from './Game'

function App() {

  const [gamers, setGamers] = useState(['', '', '', ''])
  const [rounds, setRounds] = useState(1)
  const [punctation, setPunctation] = useState("IMP")
  const [setup, setSetup] = useState(true)
  const [deals, setDeals] = useState(1)

  return (
    <div className="app_wrapper">
      {setup && 
        <Setup
          gamers = {gamers}
          setGamers = {setGamers}
          setRounds = {setRounds}
          setPunctation = {setPunctation}
          setSetup = {setSetup}
          setDeals = {setDeals}
        />
      }
      {!setup && 
        <Game
          gamers = {gamers}
          rounds = {rounds}
          punctation = {punctation}
          dealsNumber = {deals}
        />
      }
    </div>
   
  )
}

export default App
